import React, { useEffect, useState } from "react";
import { Card, Input, Space, Table, Tooltip, Modal } from "antd";
import type { GetProp, TableProps } from "antd";
import { Grid, Button, Paper, IconButton } from "@mui/material";
import AssignDeliveries from "../AssignDeliveries";
import EditOrderStatus from "../EditOrderStatus";
import ViewIssueReport from "../IssuesReport/view";
import CreateIssueReport from "../IssuesReport/create";
import DetailOrder from "../Detail";
import { appUrl, token } from "../../../appurl";
import axios from "axios";
import Notification from "../../../commonComponent/notification";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import DetailsIcon from "@mui/icons-material/Details";
import { userService } from "../../../polices/userService";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { Dialogs } from "../../../commonComponent/dialog";

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
  const [viewOpenDialog, setViewOpenDialog] = useState(false);
  const [readOpenDialog, setReadOpenDialog] = useState(false);
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
    const token = localStorage.getItem("token");
    axios
      .create({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .get(appUrl + `orders?search=${query}`)
      .then((res) => {
        setLoading(false);
        setDataSource(res.data);
      })
      .catch((error: any) => {
        setLoading(false);
        onViewError(error.response.data.error);
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
              userService.currentRole.match("Sales Person") &&
              record.isAssign == false && (
                <Tooltip title="Assign Deliveries">
                  <IconButton
                    onClick={() => {
                      setSelectedOrder(record);
                      setViewMode("assign");
                    }}
                    aria-label="edit"
                    color="primary"
                  >
                    <AssignmentTurnedInIcon />
                  </IconButton>
                </Tooltip>
              )}
            {userService.userPermission.match("update_order") &&
              userService.currentRole.match("Delivery Person") &&
              record.orderStatus != "Accepted" && (
                <Tooltip title="Edit Order Status">
                  <IconButton
                    onClick={() => {
                      setSelectedOrder(record);
                      setViewMode("edit");
                    }}
                    aria-label="edit"
                    color="success"
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
            {userService.userPermission.match("create_issueReport") &&
              record.orderStatus == "Has Issue" && (
                <Tooltip title="Report Issues">
                  <IconButton
                    onClick={() => {
                      setSelectedOrder(record);
                      setReadOpenDialog(true);
                    }}
                    aria-label="delete"
                    color="error"
                  >
                    <ReportProblemIcon />
                  </IconButton>
                </Tooltip>
              )}
            {userService.userPermission.match("read_issuesReport") &&
              record.orderStatus == "Has Issue" && (
                <Tooltip title="Report Issues">
                  <IconButton
                    onClick={() => {
                      setSelectedOrder(record);
                      setViewOpenDialog(true);
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
            {viewMode == "view" && (
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
                    Order
                  </h3>
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
                  openDialog={readOpenDialog}
                  setOpenDialog={readOpenDialog}
                  height="50%"
                  maxHeight="200"
                  children={
                    <CreateIssueReport
                      //@ts-ignore
                      selectedOrder={selectedOrder}
                      viewMode={viewMode}
                      closeedit={() => setReadOpenDialog(false)}
                    />
                  }
                />
                <Dialogs
                  openDialog={viewOpenDialog}
                  setOpenDialog={viewOpenDialog}
                  height="40%"
                  maxHeight="200"
                  children={
                    <ViewIssueReport
                      //@ts-ignore
                      selectedOrder={selectedOrder}
                      viewMode={viewMode}
                      closeedit={() => setViewOpenDialog(false)}
                    />
                  }
                />
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
          </Grid>
        </Grid>
      </Grid>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
};

export default ViewOrder;
