import React, { useEffect, useState } from "react";
import { Card, Input, Space, Table, Tooltip, Modal } from "antd";
import type { GetProp, TableProps } from "antd";
import { Grid, Button, Paper, IconButton } from "@mui/material";
import { EditOutlined } from "@mui/icons-material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CreateFeedBack from "../Create";
import { appUrl, token } from "../../../appurl";
import axios from "axios";
import Notification from "../../../commonComponent/notification";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Dialogs } from "../../../commonComponent/dialog";
import { userService } from "../../../polices/userService";

const { confirm } = Modal;

interface ItemState {
  name: string;
  description: string;
}

const initialState: ItemState = {
  name: "",
  description: "",
};

type TablePaginationConfig = Exclude<
  GetProp<TableProps, "pagination">,
  boolean
>;

interface DataType {
  name: string;
  gender: string;
  email: string;
  id: string;
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Parameters<GetProp<TableProps, "onChange">>[1];
}

const ViewFeadBack = () => {
  const [data, setData] = useState<DataType[]>();
  const [loading, setLoading] = useState(false);
  const [selectedFeedBack, setSelectedFeedBack] = useState<any>();
  const [dataSource, setDataSource] = useState<any>([]); // to set the response data and display on the table
  const [viewMode, setViewMode] = useState("view"); // to make change of the view for create and edit
  const [query, setQuery] = useState(""); // for search purpose to get the key
  const [openDialog, setOpenDialog] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  //   For searching based on the content
  const onSearch = (query: any) => {
    setQuery(query);
  };

  //   Notification for Success and error actions
  const onViewError = (response: any) => {
    setNotify({
      isOpen: true,
      type: "error",
      message: response,
    });
  };

  const onDeleteSuccess = (response: any) => {
    setNotify({
      isOpen: true,
      type: "success",
      message: response.message,
    });
    onFetchFeedBack();
  };

  const onDeleteError = (response: any) => {
    setNotify({
      isOpen: true,
      message: response,
      type: "error",
    });
  };

  const handleTableChange: TableProps["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  //   for get all data
  const onFetchFeedBack = () => {
    axios
      .create({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .get(appUrl + `comments?search=${query}`)
      .then((res) => {
        setLoading(false);
        setDataSource(res.data);
      })
      .catch((error: any) => {
        setLoading(false);
        onViewError(error.response.data.error);
      });
  };

  //   for delete the selected data using modal confirm dialog
  const showConfirm = (value: any) => {
    confirm({
      title: "Do you want to delete these feedback?",
      icon: <ExclamationCircleFilled />,
      content: "You are unable to undo the deletion of this.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        axios
          .create({
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .delete(appUrl + `comments/${value}`)
          .then((response) => {
            onDeleteSuccess(response.data);
          })
          .catch((error) => onDeleteError(error.response.data.message));
      },
      onCancel() {},
    });
  };

  //   to fetch data using useEffect, when every time this page is loaded
  useEffect(() => {
    setLoading(true);
    onFetchFeedBack();
  }, [query]);

  //   identify the columns that has to display on the table
  const columns: any = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      sorter: true,
    },
    {
      title: "Action",
      dataIndex: "",
      render: (record: any) => {
        return (
          <Space size="small">
            {userService.userPermission.match("update_comment") && (
              <Tooltip title="Edit">
                <IconButton
                  onClick={() => {
                    setSelectedFeedBack(record);
                    setViewMode("edit");
                    setOpenDialog(true);
                  }}
                  aria-label="edit"
                  color="primary"
                >
                  <EditOutlined />
                </IconButton>
              </Tooltip>
            )}
            |
            {userService.userPermission.match("delete_comment") && (
              <Tooltip title="Delete">
                <IconButton
                  onClick={() => {
                    showConfirm(record.id);
                  }}
                  aria-label="delete"
                  color="error"
                >
                  <DeleteForeverIcon />
                </IconButton>
              </Tooltip>
            )}
          </Space>
        );
      },
    },
  ];

  return (
    <div className="container">
      <Grid container spacing={0}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Card
              className="main-content-card"
              title={
                <h3
                  style={{
                    marginRight: "90%",
                    marginTop: "2%",
                    marginBottom: "1%",
                  }}
                >
                  Comment
                </h3>
              }
              extra={
                userService.userPermission.match("create_comment") && (
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    onClick={() => {
                      setOpenDialog(true);
                      setViewMode("new");
                    }}
                  >
                    New Comment
                  </Button>
                )
              }
            >
              <Card>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Input
                      className="input-search"
                      placeholder="input search text"
                      addonAfter={<b>Search</b>}
                      onKeyUp={(event: any) => onSearch(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Table
                      className="table-list"
                      size="small"
                      columns={columns}
                      rowKey={(record) => record.id}
                      dataSource={dataSource}
                      pagination={tableParams.pagination}
                      loading={loading}
                      onChange={handleTableChange}
                    />
                  </Grid>
                </Grid>
              </Card>

              {/* to open the dialog for create and update form */}
              <Dialogs
                openDialog={openDialog}
                setOpenDialog={openDialog}
                height="55%"
                maxHeight="435"
                children={
                  viewMode == "new" ? (
                    <CreateFeedBack
                      //@ts-ignore
                      selectedFeedBack={initialState}
                      viewMode={viewMode}
                      closeedit={() => setOpenDialog(false)}
                    />
                  ) : (
                    <CreateFeedBack
                      //@ts-ignore
                      selectedFeedBack={selectedFeedBack}
                      viewMode={viewMode}
                      closeedit={() => setOpenDialog(false)}
                    />
                  )
                }
              />
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
};

export default ViewFeadBack;
