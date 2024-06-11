import React, { useEffect, useState } from "react";
import { Card, Input, Space, Table, Tooltip, Modal } from "antd";
import type { GetProp, TableProps } from "antd";
import { Grid, Button, Paper, IconButton, Avatar } from "@mui/material";
import { EditOutlined } from "@mui/icons-material";
import DetailsIcon from "@mui/icons-material/Details";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CreateItem from "../Create";
import DetailItem from "../Detail";
import { appUrl, headers } from "../../../appurl";
import axios from "axios";
import Notification from "../../../commonComponent/notification";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Dialogs } from "../../../commonComponent/dialog";
import { userService } from "../../../polices/userService";

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

interface ItemState {
  itemName: string;
  itemDescription: string;
  brand: string;
  quantity: string;
  price: string;
  categoryId: string;
  itemImage: string;
}

const initialState: ItemState = {
  itemName: "",
  itemDescription: "",
  brand: "",
  quantity: "",
  price: "",
  itemImage: "",
  categoryId: "",
};

const ViewItem = () => {
  const [data, setData] = useState<DataType[]>();
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>();
  const [dataSource, setDataSource] = useState<any>([]); // to set the response data and display on the table
  const [viewMode, setViewMode] = useState("view");
  const [detailMode, setDetailMode] = useState("view");
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
    onFetchItem();
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
  const onFetchItem = () => {
    axios
      .create({
        headers: {
          Authorization: `Bearer ${headers}`,
        },
      })
      .get(appUrl + `items?search=${query}`)
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
      title: "Do you want to delete these item?",
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
          .delete(appUrl + `items/${value}`)
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
    onFetchItem();
  }, [query]);

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
      title: "Category",
      dataIndex: "categoryName",
      sorter: false,
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
      title: "Action",
      dataIndex: "",
      render: (record: any) => {
        return (
          <Space size="small">
            {userService.userPermission.match("update_item") && (
              <Tooltip title="Edit">
                <IconButton
                  onClick={() => {
                    setSelectedItem(record);
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
            {userService.userPermission.match("read_item") && (
              <Tooltip title="Detail">
                <IconButton
                  onClick={() => {
                    setSelectedItem(record);
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
            {userService.userPermission.match("delete_item") && (
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
                    <h2>
                      <b>Item</b>
                    </h2>
                  }
                  extra={
                    userService.userPermission.match("create_item") && (
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={() => {
                          setOpenDialog(true);
                          setViewMode("new");
                        }}
                      >
                        New Item
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
                    maxHeight="435"
                    children={
                      <>
                        {viewMode == "new" && (
                          <CreateItem
                            //@ts-ignore
                            selectedItem={initialState}
                            viewMode={viewMode}
                            closeedit={() => setOpenDialog(false)}
                          />
                        )}
                        {viewMode == "edit" && (
                          <CreateItem
                            //@ts-ignore
                            selectedItem={selectedItem}
                            viewMode={viewMode}
                            closeedit={() => setOpenDialog(false)}
                          />
                        )}
                      </>
                    }
                  />
                </Card>
              )}

              {detailMode == "detail" && (
                <DetailItem
                  //@ts-ignore
                  selectedItem={selectedItem}
                  viewMode={viewMode}
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

export default ViewItem;
