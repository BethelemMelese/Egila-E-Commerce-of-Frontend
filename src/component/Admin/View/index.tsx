import React, { useEffect, useState } from "react";
import { Card, Input, Space, Table, Tooltip, Modal } from "antd";
import type { GetProp, TableProps } from "antd";
import { Grid, Paper, IconButton, Button, Avatar } from "@mui/material";
import { EditOutlined } from "@mui/icons-material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CreateAdmin from "../Create";
import EditAdmin from "../Edit";
import DetailAdmin from "../Detail";
import { appUrl, token } from "../../../appurl";
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
  filter?: Parameters<GetProp<TableProps, "onChange">>[1];
}

const ViewAdmin = () => {
  const [data, setData] = useState<DataType[]>();
  const [loading, setLoading] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<any>();
  const [dataSource, setDataSource] = useState<any>([]);
  const [viewMode, setViewMode] = useState("view");
  const [query, setQuery] = useState("");
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

  //for searching based on the content
  const onSearch = (query: any) => {
    setQuery(query);
  };

  //notification for success and error action
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
    onFetchAdmin();
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
      //@ts-ignore
      filters,
      ...sorter,
    });
    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  //for get all data
  const onFetchAdmin = () => {
    axios
      .create({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .get(appUrl + `admins?search=${query}`)
      .then((res) => {
        setLoading(false);
        setDataSource(res.data);
      })
      .catch((error: any) => {
        setLoading(false);
        onViewError(error.response.data.message);
      });
  };

  //for delete the selected data using modal confirm dialog
  const showConfirm = (value: any) => {
    confirm({
      title: "Do you want to Delete The Admin Account?",
      icon: <ExclamationCircleFilled />,
      content: "You are Unable to Undo the deletion of this ",
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
          .delete(appUrl + `admins/${value}`)
          .then((response) => {
            onDeleteSuccess(response.data);
          })
          .catch((error) => onDeleteError(error.response.data.message));
      },
      onCancel() {},
    });
  };

  //to fetch data using useEffect , when everytime thise page is load
  useEffect(() => {
    setLoading(true);
    onFetchAdmin();
  }, [query]);

  //identify the colomuns that has to display on the table
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
            {userService.userPermission.match("update_admin") && (
              <Tooltip title="Edit">
                <IconButton
                  onClick={() => {
                    setSelectedAdmin(record);
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
            {userService.userPermission.match("read_admin") && (
              <Tooltip title="Detail">
                <IconButton
                  onClick={() => {
                    setSelectedAdmin(record);
                    setDetailMode("detail");
                  }}
                  arial-label="detail"
                  color="warning"
                >
                  <DetailsIcon />
                </IconButton>
              </Tooltip>
            )}
            |
            {userService.userPermission.match("delete_admin") && (
              <Tooltip title="Delete">
                <IconButton
                  onClick={() => {
                    showConfirm(record.id);
                  }}
                  arial-label="delete"
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
                      <b>Admin</b>
                    </h2>
                  }
                  extra={
                    userService.userPermission.match("delete_admin") && (
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={() => {
                          setOpenDialog(true);
                          setViewMode("new");
                        }}
                      >
                        New Admin
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
                  {/* {to open the dialog for create and update form} */}

                  <Dialogs
                    openDialog={openDialog}
                    setOpenDialog={openDialog}
                    height="60"
                    maxHeight="300"
                    children={
                      viewMode == "new" ? (
                        <CreateAdmin
                          //@ts-ignore
                          selectedAdmin={initialState}
                          viewMode={viewMode}
                          closeedit={() => setOpenDialog(false)}
                        />
                      ) : (
                        <EditAdmin
                          //@ts-ignore
                          selectedAdmin={selectedAdmin}
                          viewMode={viewMode}
                          closeedit={() => setOpenDialog(false)}
                        />
                      )
                    }
                  />
                </Card>
              )}

              {detailMode == "detail" && (
                <DetailAdmin
                  //@ts-ignore
                  selectedAdmin={selectedAdmin}
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

export default ViewAdmin;
