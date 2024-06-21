import {
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Button,
  Autocomplete,
} from "@mui/material";
import { Card } from "antd";
import Controls from "../../commonComponent/Controls";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form } from "../../commonComponent/Form";
import { appUrl, headers } from "../../appurl";
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
  const [categoryResponse, setCategoryResponse] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [itemResponse, setItemResponse] = useState<any>([]);
  const [selectedItem, setSelectedItem] = useState();
  const [dataSource, setDateSource] = useState();
  const [error, setError] = useState();

  const formik = useFormik({
    initialValues: initialState,
    onSubmit: (values) => {
      setIsSubmitting(true);
      axios
        .create({
          headers: {
            Authorization: `Bearer ${headers}`,
          },
        })
        .post(appUrl + "report", values)
        .then((response) => setDateSource(response.data))
        .catch((error) => setError(error.response.data.message));
    },
  });

  useEffect(() => {
    axios
      .create({
        headers: {
          Authorization: `Bearer ${headers}`,
        },
      })
      .get(appUrl + "reports/itemCategory")
      .then((response) => setCategoryResponse(response.data))
      .catch((error) => setCategoryResponse(error.response.data.message));
  }, []);

  useEffect(() => {
    axios
      .create({
        headers: {
          Authorization: `Bearer ${headers}`,
        },
      })
      .get(appUrl + "reports/itemName")
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
                    <Grid item xs={4}>
                      <Autocomplete
                        id="categoryId"
                        disableClearable
                        //@ts-ignore
                        options={categoryResponse}
                        getOptionLabel={(item) => item.categoryName}
                        onChange={(event: any, newValue: any | null) => {
                          setSelectedCategory(newValue.id);
                        }}
                        renderInput={(params) => (
                          <Controls.Input
                            {...params}
                            variant="outlined"
                            label="Category"
                            required
                          ></Controls.Input>
                        )}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Autocomplete
                        id="itemId"
                        disableClearable
                        //@ts-ignore
                        options={itemResponse}
                        getOptionLabel={(item) => item.itemName}
                        onChange={(event: any, newValue: any | null) => {
                          setSelectedItem(newValue.id);
                        }}
                        renderInput={(params) => (
                          <Controls.Input
                            {...params}
                            variant="outlined"
                            label="Item"
                            required
                          ></Controls.Input>
                        )}
                      />
                    </Grid>
                    <Grid item xs={4}>
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
                    <Grid item xs={4}>
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
                          <MenuItem value="In Cash">In Cash</MenuItem>
                          <MenuItem value="Online Banking">
                            Online Mobile Banking
                          </MenuItem>
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
