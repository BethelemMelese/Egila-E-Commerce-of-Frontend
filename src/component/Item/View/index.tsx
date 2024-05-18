import React, { useEffect, useState } from "react";
import BreadcrumbProp from "../../../commonComponent/BreadCrumb";
import CampaignIcon from "@mui/icons-material/Campaign";
import IconDashboard from "@mui/icons-material/Dashboard";
import { Card, Input, Space, Table } from "antd";
import type { GetProp, TableProps } from "antd";
import { Grid, Button, Paper } from "@mui/material";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import type { SearchProps } from "antd/es/input/Search";

import qs from "qs";

type ColumnsType<T> = TableProps<T>["columns"];
type TablePaginationConfig = Exclude<
  GetProp<TableProps, "pagination">,
  boolean
>;

const { Search } = Input;

const breadcrumdata: any = [
  {
    icon: <IconDashboard />,
    label: "Home",
  },
  {
    icon: <CampaignIcon />,
    label: "Announcement and Procedure",
  },
  {
    icon: "",
    label: "Announcement",
  },
];

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
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  console.log("tableParams..", tableParams);
  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);

  const columns: any = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: true,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      filters: [
        { text: "Male", value: "male" },
        { text: "Female", value: "female" },
      ],
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: () => <a>Edit</a>,
    },
  ];

  // useEffect(() => {
  //   setLoading(true);
  //   fetch(
  //     `https://randomuser.me/api?${qs.stringify(
  //       getRandomuserParams(tableParams)
  //     )}`
  //   )
  //     .then((res) => res.json())
  //     .then(({ results }) => {
  //       console.log("results..", results);
  //       setData(results);
  //       setLoading(false);
  //       setTableParams({
  //         ...tableParams,
  //         pagination: {
  //           ...tableParams.pagination,
  //           total: 200,
  //           200 is mock data, you should read it from server
  //           total: data.totalCount,
  //         },
  //       });
  //     });
  // }, [tableParams.pagination?.current, tableParams.pagination?.pageSize]);

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
        <Grid item xs={12}>
          <Paper elevation={3}>
            <Card className="search-input">
              <Search
                placeholder="input search text"
                allowClear
                enterButton="Search"
                size="middle"
                onSearch={onSearch}
              />
            </Card>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3}>
            <Card
              title="Item"
              extra={
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<NoteAddIcon />}
                >
                  New Item
                </Button>
              }
            >
              <Card className="care-table">
                <Table
                  columns={columns}
                  rowKey={(record) => record.id}
                  dataSource={data}
                  pagination={tableParams.pagination}
                  loading={loading}
                  onChange={handleTableChange}
                />
              </Card>
            </Card>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default ViewItem;
