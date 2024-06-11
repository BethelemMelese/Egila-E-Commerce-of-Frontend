import React, { useEffect, useState } from "react";
import { Card, Input, Space, Table, Tooltip, Modal } from "antd";
import type { GetProp, TableProps } from "antd";
import { Grid, Button, Paper, IconButton } from "@mui/material";
import AssignDeliveries from "../AssignDeliveries";
import EditOrderStatus from "../EditOrderStatus";
import DetailOrder from "../Detail";
import { appUrl, headers } from "../../../appurl";
import axios from "axios";
import Notification from "../../../commonComponent/notification";
import { ExclamationCircleFilled } from "@ant-design/icons";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import DetailsIcon from "@mui/icons-material/Details";
import { userService } from "../../../polices/userService";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

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
    const token=localStorage.getItem("token");
    axios
      .create({
        headers: {
          Authorization: `Bearer ${token}`,
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
    {
      title: "Order Status",
      dataIndex: "orderStatus",
      sorter: true,
    },
    {
      title: "Action",
      dataIndex: "",
      render: (record: any) => {
        return (
          <Space size="small">
            {userService.userPermission.match("update_order") &&
              userService.currentRole.match("Sales Person") && (
                <Tooltip title="Assign Deliveries">
                  <IconButton
                    onClick={() => {
                      setSelectedOrder(record);
                      setViewMode("assign");
                      setOpenDialog(true);
                    }}
                    aria-label="edit"
                    color="primary"
                  >
                    <AssignmentTurnedInIcon />
                  </IconButton>
                </Tooltip>
              )}
            {userService.userPermission.match("update_order") &&
              userService.currentRole.match("Delivery Person") && (
                <Tooltip title="Edit Order Status">
                  <IconButton
                    onClick={() => {
                      setSelectedOrder(record);
                      setViewMode("edit");
                      setOpenDialog(true);
                    }}
                    aria-label="edit"
                    color="primary"
                  >
                    <AssignmentIndIcon />
                  </IconButton>
                </Tooltip>
              )}
            |
            {userService.userPermission.match("read_order") && (
              <Tooltip title="Detail">
                <IconButton
                  onClick={() => {
                    setSelectedOrder(record);
                    setViewMode("detail");
                  }}
                  aria-label="detail"
                  color="warning"
                >
                  <DetailsIcon />
                </IconButton>
              </Tooltip>
            )}
            |
            {userService.userPermission.match("create_issueReport") && (
              <Tooltip title="Report Issues">
                <IconButton
                  onClick={() => {
                    setSelectedOrder(record);
                    setViewMode("report");
                  }}
                  aria-label="delete"
                  color="error"
                >
                  <ReportProblemIcon />
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
              {viewMode == "view" && (
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
                </Card>
              )}
              {viewMode == "assign" && (
                <AssignDeliveries
                  //@ts-ignore
                  selectedOrder={selectedOrder}
                  viewMode={viewMode}
                  closeedit={() => setViewMode("view")}
                />
              )}
              {viewMode == "edit" && (
                <EditOrderStatus
                  //@ts-ignore
                  selectedOrder={selectedOrder}
                  viewMode={viewMode}
                  closeedit={() => setViewMode("view")}
                />
              )}
              {viewMode == "detail" && (
                <DetailOrder
                  //@ts-ignore
                  selectedOrder={selectedOrder}
                  viewMode={viewMode}
                  closeedit={() => setViewMode("view")}
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

export default ViewOrder;
