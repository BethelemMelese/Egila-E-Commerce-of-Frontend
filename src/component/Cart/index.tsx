import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import MainLayout from "../Frontpage/mainLayout";
import {
  Paper,
  Grid,
  IconButton,
  Avatar,
  Button,
  Divider,
} from "@mui/material";
import { Card, GetProp, Space, Table, TableProps, Tooltip, Modal } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { appUrl } from "../../appurl";
import { EditOutlined } from "@mui/icons-material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { ExclamationCircleFilled } from "@ant-design/icons";
import Notification from "../../commonComponent/notification";
import { Dialogs } from "../../commonComponent/dialog";
import Checkout from "./checkout";
import EditCart from "./edit";

const { confirm } = Modal;

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

const ViewCart = () => {
  const [dataSource, setDateSource] = useState<any>([]);
  const [selectedCart, setSelectedCart] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [data, setData] = useState<DataType[]>();
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState("view");
  const [editMode, setEditMode] = useState("view");
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

  const onFetchError = (response: any) => {
    setLoading(false);
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
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const onDeleteError = (response: any) => {
    setNotify({
      isOpen: true,
      message: response,
      type: "error",
    });
  };

  //   for get all data
  const onFetchItem = () => {
    setLoading(true);
    const uuId = localStorage.getItem("UUCartId");
    axios
      .get(appUrl + "carts/viewCart/" + uuId)
      .then((response) => {
        setLoading(false);
        setDateSource(response.data);
      })
      .catch((error) => onFetchError(error.response.data.message));
  };

  useEffect(() => {
    onFetchItem();
  }, []);

  //   for delete the selected data using modal confirm dialog
  const showConfirm = (value: any) => {
    confirm({
      title: "Do you want to delete these cart?",
      icon: <ExclamationCircleFilled />,
      content: "You are unable to undo the deletion of this.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        axios
          .delete(appUrl + `carts/${value}`)
          .then((response) => {
            onDeleteSuccess(response.data);
          })
          .catch((error) => onDeleteError(error.response.data.message));
      },
      onCancel() {},
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

  const columns: any = [
    {
      title: "Image",
      dataIndex: "",
      render: (record: any) => {
        return (
          <>
            <Avatar
              src={appUrl + `items/uploads/${record.itemImage}`}
              variant="rounded"
            ></Avatar>
          </>
        );
      },
    },
    {
      title: "Name",
      dataIndex: "itemName",
      sorter: true,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      sorter: true,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      sorter: false,
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: false,
    },
    {
      title: "Sub Total",
      dataIndex: "subTotal",
      sorter: false,
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
                  setSelectedCart(record);
                  setEditMode("edit");
                  setOpenDialog(true);
                }}
                aria-label="edit"
                color="primary"
              >
                <EditOutlined />
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
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <MainLayout />
        </AppBar>
      </Box>
      <Box sx={{ backgroundColor: "#efefef" }}>
        <div className="cart-container">
          {viewMode == "view" && (
            <Paper elevation={2}>
              <Card>
                <Grid container spacing={2}>
                  <Grid item xs={9}>
                    <Card title={<b>Cart List</b>} className="cart-card">
                      <Table
                        className="table-list"
                        size="small"
                        columns={columns}
                        rowKey={(record) => record.id}
                        dataSource={dataSource.cartList}
                        pagination={tableParams.pagination}
                        loading={loading}
                        onChange={handleTableChange}
                      />
                    </Card>
                  </Grid>
                  <Grid item xs={3}>
                    <Card title={<b>Cart Totals</b>} className="cart-card">
                      <Grid container spacing={1}>
                        <Grid item xs={12}>
                          <p>
                            Total Item: <b>{dataSource.totalItem}</b>
                          </p>
                          <Divider
                            orientation="horizontal"
                            variant="middle"
                            flexItem
                            style={{ color: "#fff" }}
                          />
                          <p>
                            Total Price: <b>{dataSource.totalPrice}</b>
                          </p>
                          <Divider
                            orientation="horizontal"
                            variant="middle"
                            flexItem
                            style={{ color: "#fff" }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <p>You want to pay?</p>
                          <br />
                          <Button
                            variant="contained"
                            fullWidth
                            color="warning"
                            onClick={() => setViewMode("checkout")}
                          >
                            Proceed to Checkout
                          </Button>
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                </Grid>
              </Card>
              <Dialogs
                openDialog={openDialog}
                setOpenDialog={openDialog}
                height="55%"
                maxHeight="435"
                children={
                  <EditCart
                    //@ts-ignore
                    selectedCart={selectedCart}
                    closeedit={() => setOpenDialog(false)}
                  />
                }
              />
            </Paper>
          )}

          {viewMode == "checkout" && (
            <Checkout
              //@ts-ignore
              viewMode={viewMode}
              cartDatas={dataSource}
              closeedit={() => setViewMode("view")}
            />
          )}
        </div>
        <Notification notify={notify} setNotify={setNotify} />
      </Box>

      <Box>
        <div className="copyrightholder">
          <p>&copy; 2024 Egila Gadgets. All rights reserved</p>
        </div>
      </Box>
    </>
  );
};

export default ViewCart;
