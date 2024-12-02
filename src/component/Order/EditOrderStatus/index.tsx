import { Card, List } from "antd";
import { useEffect, useState } from "react";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import {
  Divider,
  Grid,
  Button,
  Tooltip,
  Paper,
  MenuItem,
  FormControl,
} from "@mui/material";
import { appUrl, token } from "../../../appurl";
import axios from "axios";
import Controls from "../../../commonComponent/Controls";
import { useFormik } from "formik";
import { Form } from "../../../commonComponent/Form";
import Notification from "../../../commonComponent/notification";
import * as Yup from "yup";

interface OrderStatus {
  orderStatus: any;
}

const initialValues: OrderStatus = {
  orderStatus: "",
};

const EditOrderStatus = ({ ...props }) => {
  const [selectedOrder, setSelectedOrder] = useState<any>(props.selectedOrder);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deliveryResponse, setDeliveryResponse] = useState();
  const [cartResponse, setCartResponse] = useState<any>();
  const [paymentResponse, setPaymentResponse] = useState<any>();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const onUpdateSuccess = () => {
    setNotify({
      isOpen: true,
      type: "success",
      message: "The order has Delivered Successfully !",
    });
    setTimeout(() => {
      setIsSubmitting(false);
      window.location.reload();
    }, 2000);
  };

  const onUpdateError = (response: any) => {
    setNotify({
      isOpen: true,
      type: "error",
      message: response,
    });
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  const validationSchema = Yup.object().shape({
    orderStatus: Yup.string().required("Order Status is required"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      axios
        .create({
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .put(appUrl + `orders/orderStatus/${selectedOrder.id}`, values)
        .then(() => onUpdateSuccess())
        .catch((error) => onUpdateError(error.response.data.message));
    },
    validationSchema: validationSchema,
  });

  useEffect(() => {
    axios
      .create({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .post(appUrl + "carts/viewCartList", { cartIds: selectedOrder.cartIds })
      .then((response) => setCartResponse(response.data))
      .catch((error) => setCartResponse(error.response.data.message));
  }, [selectedOrder]);

  useEffect(() => {
    axios
      .create({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .get(appUrl + `payments/${selectedOrder.id}`)
      .then((response) => setPaymentResponse(response.data))
      .catch((error) => setPaymentResponse(error.response.data.message));
  }, [selectedOrder]);

  useEffect(() => {
    axios
      .create({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .get(appUrl + "deliveryPersons/name")
      .then((response) => setDeliveryResponse(response.data))
      .catch((error) => setDeliveryResponse(error.response.data.message));
  }, []);

  return (
    <div>
      <Card
        title="Edit Order Status"
        extra={
          <a onClick={() => props.closeedit()}>
            <CancelOutlinedIcon fontSize="medium" className="close-btn" />
          </a>
        }
      >
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Paper>
                  <Card title="Customer Information">
                    <p>
                      Order Owner: <b>{selectedOrder.orderOwner}</b>
                    </p>
                    <Divider
                      orientation="horizontal"
                      variant="middle"
                      flexItem
                      style={{ color: "#fff" }}
                    />
                    <p>
                      Owner Phone: <b>{selectedOrder.orderPhone}</b>
                    </p>
                    <Divider
                      orientation="horizontal"
                      variant="middle"
                      flexItem
                      style={{ color: "#fff" }}
                    />
                    <p>
                      Total Amount: <b>{selectedOrder.totalAmount}</b>
                    </p>
                    <Divider
                      orientation="horizontal"
                      variant="middle"
                      flexItem
                      style={{ color: "#fff" }}
                    />
                    {/* <p>
                      Shopping Address: <b>{selectedOrder.shoppingAddress}</b>
                    </p> */}
                    <Divider
                      orientation="horizontal"
                      variant="middle"
                      flexItem
                      style={{ color: "#fff" }}
                    />
                    <p>
                      Order Date: <b>{selectedOrder.orderDate}</b>
                    </p>
                    <Divider
                      orientation="horizontal"
                      variant="middle"
                      flexItem
                      style={{ color: "#fff" }}
                    />
                    <p>
                      Order Status: <b>{selectedOrder.orderStatus}</b>
                    </p>
                    <Divider
                      orientation="horizontal"
                      variant="middle"
                      flexItem
                      style={{ color: "#fff" }}
                    />
                  </Card>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={8}>
            <Paper>
              <Card
                title="List of Item"
                style={{ height: 682, overflow: "auto" }}
              >
                {cartResponse != undefined &&
                  cartResponse.map((item: any) => {
                    return (
                      <div style={{ marginTop: 10 }}>
                        <Card>
                          <Grid container spacing={2}>
                            <Grid item xs={2}>
                              <img
                                alt="Items Image"
                                src={item.itemImage}
                                style={{
                                  height: 100,
                                  marginTop: 20,
                                  width: 100,
                                }}
                              />
                            </Grid>
                            <Grid item xs={10}>
                              <h3 style={{ marginRight: "70%" }}>
                                {item.itemName}
                              </h3>
                              <div>
                                <p>{item.itemDescription}</p>
                              </div>
                              <div style={{ marginRight: "77%" }}>
                                <p>
                                  <b> Quantity: {item.quantity}</b>
                                </p>
                              </div>
                              <div style={{ marginLeft: "77%" }}>
                                <p>
                                  <b> Price: {item.price}</b>
                                </p>
                              </div>
                              <div style={{ marginLeft: "70%" }}>
                                <p>
                                  <b> Sub Total: {item.subTotal}</b>
                                </p>
                              </div>
                            </Grid>
                          </Grid>
                        </Card>
                      </div>
                    );
                  })}
              </Card>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper>
              <Card title="To Check Orders">
                <Form
                  autoComplete="off"
                  noValidate
                  onSubmit={formik.handleSubmit}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
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
                      <div className="btn-form">
                        {isSubmitting ? (
                          <Button
                            className="clicked-btn"
                            variant="contained"
                            disabled={isSubmitting}
                          >
                            Assigning...
                          </Button>
                        ) : (
                          <Button
                            className="send-btn"
                            variant="contained"
                            type="submit"
                          >
                            Assign
                          </Button>
                        )}
                      </div>
                    </Grid>
                  </Grid>
                </Form>
              </Card>
            </Paper>
          </Grid>
        </Grid>
      </Card>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
};

export default EditOrderStatus;
