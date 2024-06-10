import React, { useEffect, useState } from "react";
import { Card, Input, Space, Table, Tooltip, Modal } from "antd";
import type { GetProp, TableProps } from "antd";
import { Grid, Button, Paper, IconButton } from "@mui/material";
import { EditOutlined } from "@mui/icons-material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import CreateOrder from "../Create";
import { appUrl, headers } from "../../../appurl";
import axios from "axios";
import Notification from "../../../commonComponent/notification";
import { ExclamationCircleFilled } from "@ant-design/icons";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import DetailsIcon from "@mui/icons-material/Details";
import { Dialogs } from "../../../commonComponent/dialog";

const { confirm } = Modal;

interface ItemState {
  orderName: string;
  orderDescription: string;
}

const initialState: ItemState = {
  orderName: "",
  orderDescription: "",
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

const ViewOrder = () => {
  const [data, setData] = useState<DataType[]>();
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>();
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
    onFetchOrder();
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
  const onFetchOrder = () => {
    axios
      .create({
            headers: {
              Authorization: `Bearer ${headers}`,
            },
          })
      .get(appUrl + `orders?search=${query}`)
      .then((res) => {
        setLoading(false);
        setDataSource(res.data);
      })
      .catch((error: any) => {
        setLoading(false);
        onViewError(error.message);
      });
  };

  //   for delete the selected data using modal confirm dialog
  const showConfirm = (value: any) => {
    confirm({
      title: "Do you want to delete these order?",
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
          .delete(appUrl + `orders/${value}`)
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
    onFetchOrder();
  }, [query]);

  //   identify the columns that has to display on the table
  const columns: any = [
    {
      title: "Order Owner",
      dataIndex: "orderOwner",
      sorter: true,
    },
    {
      title: "Owner Phone",
      dataIndex: "orderPhone",
      sorter: true,
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      sorter: true,
    },
    // {
    //   title: "Order Date",
    //   dataIndex: "orderDate",
    //   sorter: true,
    // },
    {
      title: "Order Status",
      dataIndex: "orderStatus",
      sorter: true,
    },
    // {
    //     title: "Shopping Address",
    //     dataIndex: "shoppingAddress",
    //     sorter: true,
    //   },
    {
      title: "Action",
      dataIndex: "",
      render: (record: any) => {
        return (
          <Space size="small">
            <Tooltip title="Edit">
              <IconButton
                onClick={() => {
                  setSelectedOrder(record);
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
            {/* <Tooltip title="Detail">
              <IconButton
                onClick={() => {
                  setSelectedOrder(record);
                  setViewMode("detail");
                }}
                aria-label="detail"
                color="secondary"
              >
                <DetailsIcon />
              </IconButton>
            </Tooltip> */}
            {/* | */}
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
                    <b>Order</b>
                  </h2>
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
                {/* <Dialogs
                  openDialog={openDialog}
                  setOpenDialog={openDialog}
                  height="55%"
                  maxHeight="435"
                  children={
                    viewMode == "new" ? (
                      <CreateOrder
                        //@ts-ignore
                        selectedOrder={initialState}
                        viewMode={viewMode}
                        closeedit={() => setOpenDialog(false)}
                      />
                    ) : (
                      <CreateOrder
                        //@ts-ignore
                        selectedOrder={selectedOrder}
                        viewMode={viewMode}
                        closeedit={() => setOpenDialog(false)}
                      />
                    )
                  }
                /> */}
              </Card>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
};

export default ViewOrder;
