import React, { useEffect, useState } from "react";
import { Card, Input, Space, Table, Tooltip } from "antd";
import type { GetProp, TableProps } from "antd";
import { Grid, Button, Paper, Typography, IconButton } from "@mui/material";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import type { SearchProps } from "antd/es/input/Search";
import { EditOutlined } from "@mui/icons-material";
import DetailsIcon from "@mui/icons-material/Details";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CreateItem from "../Create";

type ColumnsType<T> = TableProps<T>["columns"];
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

const getRandomuserParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

const ViewItem = () => {
  const [data, setData] = useState<DataType[]>();
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [viewMode, setViewMode] = useState("view");
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });

  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);

  const modeDate: any = [
    {
      id: 1,
      itemName: "The First Item",
      itemDescription: "The First Item Description",
      quantity: 5,
      price: 100,
      brand: "Ethiopia, Brand",
    },
    {
      id: 2,
      itemName: "The First Item",
      itemDescription: "The First Item Description",
      quantity: 5,
      price: 100,
      brand: "Ethiopia, Brand",
    },
    {
      id: 3,
      itemName: "The First Item",
      itemDescription: "The First Item Description",
      quantity: 5,
      price: 100,
      brand: "Ethiopia, Brand",
    },
    {
      id: 4,
      itemName: "The First Item",
      itemDescription: "The First Item Description",
      quantity: 5,
      price: 100,
      brand: "Ethiopia, Brand",
    },
    {
      id: 5,
      itemName: "The First Item",
      itemDescription: "The First Item Description",
      quantity: 5,
      price: 100,
      brand: "Ethiopia, Brand",
    },
    {
      id: 6,
      itemName: "The First Item",
      itemDescription: "The First Item Description",
      quantity: 5,
      price: 100,
      brand: "Ethiopia, Brand",
    },
  ];

  const columns: any = [
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
      title: "Description",
      dataIndex: "itemDescription",
      sorter: false,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (record: any) => {
        return (
          <Space size="small">
            <Tooltip title="Edit">
              <IconButton
                onClick={() => {
                  setSelectedItem(record);
                  setViewMode("edit");
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
                  setSelectedItem(record);
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
                  // setConfirmDialog({
                  //   isOpen: true,
                  //   title: "Are you sure to delete",
                  //   //@ts-ignore
                  //   onConfirm: () => {
                  //     onDelete(record.id);
                  //   },
                  // });
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

  useEffect(() => {
    // setLoading(true);
    // fetch(
    //   `https://randomuser.me/api?${qs.stringify(
    //     getRandomuserParams(tableParams)
    //   )}`
    // )
    //   .then((res) => res.json())
    //   .then(({ results }) => {
    //     console.log("results..", results);
    //     setData(results);
    //     setLoading(false);
    //     setTableParams({
    //       ...tableParams,
    //       pagination: {
    //         ...tableParams.pagination,
    //         total: 200,
    //         // 200 is mock data, you should read it from server
    //         // total: data.totalCount,
    //       },
    //     });
    //   });
  }, [tableParams.pagination?.current, tableParams.pagination?.pageSize]);

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

  return (
    <div className="container">
      <Grid container spacing={0}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Paper elevation={3} className="main-content">
              <Card
                className="main-content-card"
                title={
                  viewMode == "view" && (
                    <Typography
                      variant="h5"
                      style={{marginRight:"87%",marginTop:"2%",marginBottom:"1%"}}
                    >
                      <b>Item</b>
                    </Typography>
                  )
                }
                extra={
                  viewMode == "view" && (
                    <Button
                      variant="contained"
                      color="success"
                      startIcon={<NoteAddIcon />}
                      onClick={() => setViewMode("new")}
                    >
                      New Item
                    </Button>
                  )
                }
              >
                {viewMode == "view" && (
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Card>
                        <Input
                          className="input-search"
                          placeholder="input search text"
                          addonAfter="search"
                          onKeyUp={(event: any) => onSearch(event.target.value)}
                        />
                      </Card>
                    </Grid>
                    <Grid item xs={12}>
                      <Card className="care-table">
                        <Table
                          className="table-list"
                          size="small"
                          columns={columns}
                          rowKey={(record) => record.id}
                          dataSource={modeDate}
                          pagination={tableParams.pagination}
                          loading={loading}
                          onChange={handleTableChange}
                        />
                      </Card>
                    </Grid>
                  </Grid>
                )}

                {viewMode == "new" && (
                  <CreateItem
                    //@ts-ignore
                    selectedItem={selectedItem}
                    viewMode={viewMode}
                    closeedit={() => setViewMode("view")}
                  />
                )}

                {viewMode == "edit" && (
                  <CreateItem
                    //@ts-ignore
                    selectedItem={selectedItem}
                    viewMode={viewMode}
                    closeedit={() => setViewMode("view")}
                  />
                )}
              </Card>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default ViewItem;
