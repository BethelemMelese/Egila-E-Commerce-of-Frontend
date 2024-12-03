import { FormControl, Grid, MenuItem, Paper, Button } from "@mui/material";
import { Card, GetProp, Table, TableProps } from "antd";
import Controls from "../../commonComponent/Controls";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Form } from "../../commonComponent/Form";
import { appUrl, token } from "../../appurl";
import axios from "axios";
import { useState } from "react";

interface ReportState {
  orderStatus: string;
  paymentMethod: string;
}

const initialState: ReportState = {
  orderStatus: "",
  paymentMethod: "",
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

const Report = ({ ...props }) => {
  const [data, setData] = useState<DataType[]>();
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dataSource, setDateSource] = useState();
  const [error, setError] = useState();
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });

  const validationSchema = Yup.object().shape({
    orderStatus: Yup.string().required("Order Status is required"),
  });

  const formik = useFormik({
    initialValues: initialState,
    onSubmit: (values) => {
      axios
        .create({
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .post(appUrl + "reports/generateReport", values)
        .then((response) => setDateSource(response.data))
        .catch((error) => setError(error.response.data.message));
    },
    validationSchema: validationSchema,
  });

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
  ];

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
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card
              title={
                <h3
                  style={{
                    marginRight: "90%",
                    marginTop: "2%",
                    marginBottom: "1%",
                  }}
                >
                  Report
                </h3>
              }
            >
              <Form
                autoComplete="off"
                noValidate
                onSubmit={formik.handleSubmit}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl variant="outlined" className="selectbox">
                      <Controls.Input
                        select
                        id="orderStatus"
                        required
                        label="Order Status"
                        {...formik.getFieldProps("orderStatus")}
                        error={
                          formik.touched.orderStatus &&
                          formik.errors.orderStatus
                            ? formik.errors.orderStatus
                            : ""
                        }
                      >
                        <MenuItem value="Accepted">Accepted</MenuItem>
                        <MenuItem value="Denied">Denied</MenuItem>
                        <MenuItem value="Has Issue">Has Issue</MenuItem>
                      </Controls.Input>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    {isSubmitting ? (
                      <Button variant="contained" size="small" disabled>
                        generating...
                      </Button>
                    ) : (
                      <Button
                        className="report-btn"
                        variant="contained"
                        type="submit"
                        size="small"
                      >
                        Generate
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Form>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
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
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Report;
