import { Card, List } from "antd";
import { useEffect, useState } from "react";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Divider, Grid, Tooltip, Paper } from "@mui/material";
import { appUrl, headers } from "../../../appurl";
import axios from "axios";

const DetailOrder = ({ ...props }) => {
  const [selectedOrder, setSelectedOrder] = useState<any>(props.selectedOrder);
  const [cartResponse, setCartResponse] = useState<any>();
  const [paymentResponse, setPaymentResponse] = useState<any>();
  const [deliveryNameResponse, setDeliveryNameResponse] = useState<any>();

  console.log("deliveryNameResponse....", deliveryNameResponse);
  useEffect(() => {
    axios
      .create({
        headers: {
          Authorization: `Bearer ${headers}`,
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
          Authorization: `Bearer ${headers}`,
        },
      })
      .get(appUrl + `orders/deliveryName/${selectedOrder.deliveryPersonId}`)
      .then((response) => setDeliveryNameResponse(response.data))
      .catch((error) => setDeliveryNameResponse(undefined));
  }, [selectedOrder]);

  useEffect(() => {
    axios
      .create({
        headers: {
          Authorization: `Bearer ${headers}`,
        },
      })
      .get(appUrl + `payments/${selectedOrder.id}`)
      .then((response) => setPaymentResponse(response.data))
      .catch((error) => setPaymentResponse(error.response.data.message));
  }, [selectedOrder]);

  return (
    <div>
      <Card
        title="Detail Order"
        extra={
          <a onClick={() => props.closeedit()}>
            <CancelOutlinedIcon fontSize="medium" className="close-btn" />
          </a>
        }
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
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
                    <p>
                      Shopping Address: <b>{selectedOrder.shoppingAddress}</b>
                    </p>
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
              <Grid item xs={6}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    {paymentResponse != undefined && (
                      <Paper>
                        <Card title="Payment Information">
                          <p>
                            Payment Method:{" "}
                            <b>{paymentResponse.paymentMethod}</b>
                          </p>
                          <Divider
                            orientation="horizontal"
                            variant="middle"
                            flexItem
                            style={{ color: "#fff" }}
                          />
                          <p>
                            Payment Status:{" "}
                            <b>{paymentResponse.paymentStatus}</b>
                          </p>
                          <Divider
                            orientation="horizontal"
                            variant="middle"
                            flexItem
                            style={{ color: "#fff" }}
                          />
                          <p>
                            Payment Slip:{" "}
                            <Tooltip title="Click here to see the payment slip">
                              <u>
                                <a
                                  target="_blank"
                                  href={
                                    appUrl +
                                    `payments/uploads/${paymentResponse.paymentSlip}`
                                  }
                                >
                                  Click Here
                                </a>
                              </u>
                            </Tooltip>
                          </p>
                          <Divider
                            orientation="horizontal"
                            variant="middle"
                            flexItem
                            style={{ color: "#fff" }}
                          />
                        </Card>
                      </Paper>
                    )}
                  </Grid>
                  {deliveryNameResponse != undefined && (
                    <Grid item xs={12}>
                      <Paper>
                        <Card>
                          <p>
                            Delivery Name:{" "}
                            <b>{deliveryNameResponse.fullName}</b>
                          </p>
                          <Divider
                            orientation="horizontal"
                            variant="middle"
                            flexItem
                            style={{ color: "#fff" }}
                          />
                          <p>
                            Phone: <b>{deliveryNameResponse.phone}</b>
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
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
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
                                src={appUrl + `items/uploads/${item.itemImage}`}
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
        </Grid>
      </Card>
    </div>
  );
};

export default DetailOrder;
