import React, { useEffect, useState } from "react";
import { Card, Input, Space, Table, Tooltip, Modal } from "antd";
import type { GetProp, TableProps } from "antd";
import { Grid, Paper, IconButton, Button, Avatar } from "@mui/material";
import { EditOutlined } from "@mui/icons-material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CreateSalesPerson from "../Create";
import EditSalesPerson from "../Edit";
import DetailSalesPerson from "../Detail";
import { appUrl, headers } from "../../../appurl";
import axios from "axios";
import Notification from "../../../commonComponent/notification";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Dialogs } from "../../../commonComponent/dialog";
import DetailsIcon from "@mui/icons-material/Details";
import { userService } from "../../../polices/userService";

const { confirm } = Modal;

interface ItemState {
  firstName: string;
  middleName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
}

const initialState: ItemState = {
  firstName: "",
  middleName: "",
  lastName: "",
  phone: "",
  email: "",
  address: "",
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

const ViewSalesPerson = () => {
  const [data, setData] = useState<DataType[]>();
  const [loading, setLoading] = useState(false);
  const [selectedSalesPerson, setSelectedSalesPerson] = useState<any>();
  const [dataSource, setDataSource] = useState<any>([]); // to set the response data and display on the table
  const [viewMode, setViewMode] = useState("view"); // to make change of the view for create and edit
  const [query, setQuery] = useState(""); // for search purpose to get the key
  const [detailMode, setDetailMode] = useState("view");
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
    onFetchSalesPerson();
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
  const onFetchSalesPerson = () => {
    axios
      .create({
        headers: {
          Authorization: `Bearer ${headers}`,
        },
      })
      .get(appUrl + `salesPersons?search=${query}`)
      .then((res) => {
        setLoading(false);
        setDataSource(res.data);
      })
      .catch((error: any) => {
        setLoading(false);
        if (error.response.data.error == null) {
          onViewError(error.response.data.message);
        } else onViewError(error.response.data.error);
      });
  };

  //   for delete the selected data using modal confirm dialog
  const showConfirm = (value: any) => {
    confirm({
      title: "Do you want to delete these sales person?",
      icon: <ExclamationCircleFilled />,
      content: "You are unable to undo the deletion of this.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        axios
          .create({
            headers: {
              Authorization: `Bearer ${headers}`,
            },
          })
          .delete(appUrl + `salesPersons/${value}`)
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
    onFetchSalesPerson();
  }, [query]);

  //   identify the columns that has to display on the table
  const columns: any = [
    {
      title: "Photo",
      dataIndex: "",
      render: (record: any) => {
        return (
          <>
            {record.profileImage != undefined ? (
              <Avatar
                src={appUrl + `users/uploads/${record.profileImage}`}
              ></Avatar>
            ) : (
              <Avatar />
            )}
          </>
        );
      },
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: true,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      sorter: true,
    },
    {
      title: "Address",
      dataIndex: "address",
      sorter: true,
    },
    {
      title: "Action",
      dataIndex: "",
      render: (record: any) => {
        return (
          <Space size="small">
            {userService.userPermission.match("update_salesPerson") && (
              <Tooltip title="Edit">
                <IconButton
                  onClick={() => {
                    setSelectedSalesPerson(record);
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
            {userService.userPermission.match("read_salesPerson") && (
              <Tooltip title="Detail">
                <IconButton
                  onClick={() => {
                    setSelectedSalesPerson(record);
                    setDetailMode("detail");
                  }}
                  aria-label="detail"
                  color="warning"
                >
                  <DetailsIcon />
                </IconButton>
              </Tooltip>
            )}
            |
            {userService.userPermission.match("delete_salesPerson") && (
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
            <Paper elevation={3} className="main-content">
              {detailMode == "view" && (
                <Card
                  className="main-content-card"
                  title={
                    <h2
                      style={{
                        marginRight: "90%",
                        marginTop: "2%",
                        marginBottom: "1%",
                      }}
                    >
                      <b>Sales Person</b>
                    </h2>
                  }
                  extra={
                    userService.userPermission.match("create_salesPerson") && (
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={() => {
                          setOpenDialog(true);
                          setViewMode("new");
                        }}
                      >
                        New Sales Person
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
                    height="60%"
                    maxHeight="300"
                    children={
                      viewMode == "new" ? (
                        <CreateSalesPerson
                          //@ts-ignore
                          selectedSalesPerson={initialState}
                          viewMode={viewMode}
                          closeedit={() => setOpenDialog(false)}
                        />
                      ) : (
                        <EditSalesPerson
                          //@ts-ignore
                          selectedSalesPerson={selectedSalesPerson}
                          viewMode={viewMode}
                          closeedit={() => setOpenDialog(false)}
                        />
                      )
                    }
                  />
                </Card>
              )}

              {detailMode == "detail" && (
                <DetailSalesPerson
                  //@ts-ignore
                  selectedSalesPerson={selectedSalesPerson}
                  detailMode={detailMode}
                  closeedit={() => setDetailMode("view")}
                />
              )}
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
};

export default ViewSalesPerson;
