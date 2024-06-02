import { FormControl, Grid, MenuItem, Paper, Button } from "@mui/material";
import { Card } from "antd";
import Controls from "../../commonComponent/Controls";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form } from "../../commonComponent/Form";
import { appUrl } from "../../appurl";
import axios from "axios";
import { useEffect, useState } from "react";

interface ReportState {
  categoryId: string;
  itemId: string;
  orderStatus: string;
  paymentMethod: string;
}

const initialState: ReportState = {
  categoryId: "",
  itemId: "",
  orderStatus: "",
  paymentMethod: "",
};

const Report = ({ ...props }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categoryResponse, setCategoryResponse] = useState<any>();
  const [itemResponse, setItemResponse] = useState<any>();
  const [dataSource, setDateSource] = useState();
  const [error, setError] = useState();

  const formik = useFormik({
    initialValues: initialState,
    onSubmit: (values) => {
      setIsSubmitting(true);
      axios
        .post(appUrl + "report", values)
        .then((response) => setDateSource(response.data))
        .catch((error) => setError(error.response.data.message));
    },
  });

  useEffect(() => {
    axios
      .get(appUrl + "itemCategorys")
      .then((response) => setCategoryResponse(response.data))
      .catch((error) => setCategoryResponse(error.response.data.message));
  }, []);

  useEffect(() => {
    axios
      .get(appUrl + "items")
      .then((response) => setItemResponse(response.data))
      .catch((error) => setItemResponse(error.response.data.message));
  }, []);

  return (
    <div className="container">
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper elevation={2}>
              <Card title="Report">
                <Form
                  autoComplete="off"
                  noValidate
                  onSubmit={formik.handleSubmit}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={3}>
                      <FormControl variant="outlined" className="selectbox">
                        <Controls.Input
                          select
                          id="categoryId"
                          required
                          label="Category"
                          {...formik.getFieldProps("categoryId")}
                          error={
                            formik.touched.categoryId &&
                            formik.errors.categoryId
                              ? formik.errors.categoryId
                              : ""
                          }
                        >
                          {/* {categoryResponse.map((value: any) => {
                            return (
                              <MenuItem value={value.id}>
                                {value.categoryName}
                              </MenuItem>
                            );
                          })} */}
                        </Controls.Input>
                      </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                      <FormControl variant="outlined" className="selectbox">
                        <Controls.Input
                          select
                          id="itemId"
                          required
                          label="Item"
                          {...formik.getFieldProps("itemId")}
                          error={
                            formik.touched.itemId && formik.errors.itemId
                              ? formik.errors.itemId
                              : ""
                          }
                        >
                          {/* {itemResponse.map((value: any) => {
                            return (
                              <MenuItem value={value.id}>
                                {value.itemName}
                              </MenuItem>
                            );
                          })} */}
                        </Controls.Input>
                      </FormControl>
                    </Grid>
                    <Grid item xs={3}>
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
                          <MenuItem value="Ongoing">Ongoing</MenuItem>
                          <MenuItem value="Payed">Payed</MenuItem>
                          <MenuItem value="Denied">Denied</MenuItem>
                        </Controls.Input>
                      </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                      <FormControl variant="outlined" className="selectbox">
                        <Controls.Input
                          select
                          id="paymentMethod"
                          required
                          label="Payment Method"
                          {...formik.getFieldProps("paymentMethod")}
                          error={
                            formik.touched.paymentMethod &&
                            formik.errors.paymentMethod
                              ? formik.errors.paymentMethod
                              : ""
                          }
                        >
                          <MenuItem value="OnCash">On Cash</MenuItem>
                          <MenuItem value="OnOnline">On Online</MenuItem>
                        </Controls.Input>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      {isSubmitting ? (
                        <Button
                          className="report-btn"
                          variant="contained"
                          size="small"
                          disabled
                        >
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
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={2}>
              <Card></Card>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={1}>
              <Card></Card>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Report;
