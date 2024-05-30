import React, { useEffect, useState } from "react";
import { Card, Input, Space, Table, Tooltip, Modal } from "antd";
import type { GetProp, TableProps } from "antd";
import { Grid, Paper, IconButton, Button } from "@mui/material";
import { EditOutlined } from "@mui/icons-material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CreateSalesPerson from "../Create";
import { appUrl } from "../../../appurl";
import axios from "axios";
import Notification from "../../../commonComponent/notification";
import { ExclamationCircleFilled } from "@ant-design/icons";
import {Dialogs} from "../../../commonComponent/dialog";
import DetailsIcon from "@mui/icons-material/Details";

const { confirm } = Modal;

interface ItemState {
  firstName: string;
  middleName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  subCity: string;
  town: string;
}

const initialState: ItemState = {
  firstName: "",
  middleName: "",
  lastName: "",
  phone: "",
  email: "",
  address: "",
  subCity: "",
  town: "",
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

const MokeData = [
  {
    id: "1",
    firstName: "Update asd",
    middleName: "Update asd",
    lastName: "Add the lastname",
    fullName: "Update asd Update asd Add the lastname",
    phone: "0910101010",
    email: "updateasd@gmail.com",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiU3VuIE1heSAxMiAyMDI0IDA5OjI3OjA2IEdNVCswMzAwIChFYXN0IEFmcmljYSBUaW1lKSIsIm5hbWUiOiJhc2QgYXNkICIsImVtYWlsIjoiYXNkQGdtYWlsLmNvbSIsInJvbGVJZCI6IjY2M2ZiMjUwZGY0MzRhNDE0NTJmNDJjMyIsInJvbGVOYW1lIjoiQ3VzdG9tZXIiLCJpYXQiOjE3MTU0OTUyMjYsImV4cCI6MTcxOTA5NTIyNn0.MNJk4CWn4lzGyeTG01lHEXIWHbxqUVSkt-G7N15ayIw",
    userId: "6640613b5ca047c89e3f9dd4",
    registrationDate: "2024-05-12T06:27:07.000Z",
    address: "Addis Ababa, Ethiopia",
    subCity: "Ayer Tena",
    town: "Ayer Tena",
    roleId: "663fb250df434a41452f42c3",
    roleName: "SalesPerson",
  },
  {
    id: "2",
    firstName: "Bethelem Melese",
    middleName: "Update asd",
    lastName: "Add the lastname",
    fullName: "Update asd Update asd Add the lastname",
    phone: "0910101010",
    email: "updateasd@gmail.com",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiU3VuIE1heSAxMiAyMDI0IDA5OjI3OjA2IEdNVCswMzAwIChFYXN0IEFmcmljYSBUaW1lKSIsIm5hbWUiOiJhc2QgYXNkICIsImVtYWlsIjoiYXNkQGdtYWlsLmNvbSIsInJvbGVJZCI6IjY2M2ZiMjUwZGY0MzRhNDE0NTJmNDJjMyIsInJvbGVOYW1lIjoiQ3VzdG9tZXIiLCJpYXQiOjE3MTU0OTUyMjYsImV4cCI6MTcxOTA5NTIyNn0.MNJk4CWn4lzGyeTG01lHEXIWHbxqUVSkt-G7N15ayIw",
    userId: "6640613b5ca047c89e3f9dd4",
    registrationDate: "2024-05-12T06:27:07.000Z",
    address: "Addis Ababa, Ethiopia",
    subCity: "Ayer Tena",
    town: "Ayer Tena",
    roleId: "663fb250df434a41452f42c3",
    roleName: "SalesPerson",
  },
];
const ViewSalesPerson = () => {
  const [data, setData] = useState<DataType[]>();
  const [loading, setLoading] = useState(false);
  const [selectedSalesPerson, setSelectedSalesPerson] = useState<any>();
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
    // axios
    //   .get(appUrl + `salesPersons?search=${query}`)
    //   .then((res) => {
    //     setLoading(false);
    //     setDataSource(res.data);
    //   })
    //   .catch((error: any) => {
    //     setLoading(false);
    //     onViewError(error.response.data.message);
    //   });
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
    // setLoading(true);
    // onFetchSalesPerson();
  }, [query]);

  //   identify the columns that has to display on the table
  const columns: any = [
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
      title: "Sub City",
      dataIndex: "subCity",
      sorter: true,
    },
    {
      title: "Town",
      dataIndex: "town",
      sorter: true,
    },
    {
      title: "Action",
      dataIndex: "",
      render: (record: any) => {
        return (
          <Space size="small">
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
            |
            <Tooltip title="Detail">
              <IconButton
                onClick={() => {
                  setSelectedSalesPerson(record);
                  setViewMode("detail");
                }}
                aria-label="detail"
                color="secondary"
              >
                <DetailsIcon />
              </IconButton>
            </Tooltip>
            |
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
                        // dataSource={dataSource}
                        dataSource={MokeData}
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
                  height="70%"
                  maxHeight="435"
                  children={
                    viewMode == "new" ? (
                      <CreateSalesPerson
                        //@ts-ignore
                        selectedSalesPerson={initialState}
                        viewMode={viewMode}
                        closeedit={() => setOpenDialog(false)}
                      />
                    ) : (
                      <CreateSalesPerson
                        //@ts-ignore
                        selectedSalesPerson={selectedSalesPerson}
                        viewMode={viewMode}
                        closeedit={() => setOpenDialog(false)}
                      />
                    )
                  }
                />
              </Card>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
};

export default ViewSalesPerson;
