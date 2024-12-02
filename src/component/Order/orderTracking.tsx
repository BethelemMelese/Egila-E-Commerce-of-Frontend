import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Navmenu from "../Frontpage/mainLayout";
import axios from "axios";
import { appUrl } from "../../appurl";
import { Grid, Button, Divider, Avatar } from "@mui/material";
import { Card, List } from "antd";
import Footer from "../Frontpage/footerSide";
import HistoryIcon from "@mui/icons-material/History";
import itemImage from "../../Images/pcsSecond.jpg";
import itemImage2 from "../../Images/pcs.jpg";

const recentOrderList = [
  {
    id: 1,
    itemName: "First Item",
    quantity: 3,
    price: "1500 ETB",
    status: "Pending",
  },
  {
    id: 1,
    itemName: "First Item",
    quantity: 3,
    price: "1500 ETB",
    status: "Pending",
  },
  {
    id: 1,
    itemName: "First Item",
    quantity: 3,
    price: "1500 ETB",
    status: "Pending",
  },
  {
    id: 1,
    itemName: "First Item",
    quantity: 3,
    price: "1500 ETB",
    status: "Pending",
  },
];

const OrderTracking = () => {
  const [viewMode, setViewMode] = useState("recent");
  const [response, setResponse] = useState<any>();
  const [newOrderResponse, setNewOrderResponse] = useState<any>();
  const [oldOrderResponse, setOldOrderResponse] = useState<any>();
  const [totalOrderResponse, setTotalOrderResponse] = useState<any>();
  const [query, setQuery] = useState(""); // for search purpose to get the key
  const [getKey, setGetKey] = useState(null);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  console.log("oldOrderResponse...", oldOrderResponse);
  console.log("totalOrderResponse...", totalOrderResponse);
  console.log("newOrderResponse.;..", newOrderResponse);
  
  const onFetchSuccess = (response: any) => {
    setResponse(response);
  };

  const onFetchError = (error: any) => {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
  };

  useEffect(() => {
    axios
      .create({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .get(appUrl + `users/userInfo/${localStorage.getItem("token")}`)
      .then((response: any) => onFetchSuccess(response.data))
      .catch((error: any) => onFetchError(error));
  }, []);

  useEffect(() => {
    if (response != undefined) {
      axios
        .create({
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .get(appUrl + `orders/newOrder/${response.id}`)
        .then((response: any) => setNewOrderResponse(response.data))
        .catch((error: any) => onFetchError(error));
    }
  }, [response]);

  useEffect(() => {
    if (response != undefined) {
      axios
        .create({
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .get(appUrl + `orders/oldOrder/${response.id}`)
        .then((response: any) => setOldOrderResponse(response.data))
        .catch((error: any) => onFetchError(error));
    }
  }, [response]);

  useEffect(() => {
    if (response != undefined) {
      axios
        .create({
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .get(appUrl + `orders/totalOrders/${response.id}`)
        .then((response: any) => setTotalOrderResponse(response.data))
        .catch((error: any) => onFetchError(error));
    }
  }, [response]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Navmenu inputValue={(value: any) => setGetKey(value)} />
      </AppBar>

      <Box sx={{ backgroundColor: "#efefef" }}>
        <div className="tracking-container">
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Card title="Recent Orders">
                    {newOrderResponse != undefined &&
                      newOrderResponse.map((item: any) => {
                        return (
                          <>
                            <Grid container spacing={0}>
                              <Grid item xs={4}>
                                <div className="itemImage">
                                  <img
                                    src={item.itemImage}
                                    width={200}
                                    height={150}
                                  />
                                </div>
                              </Grid>
                              <Grid item xs={8}>
                                <div className="itemDetail">
                                  <h3>{item.itemName}</h3>
                                  <p>{item.itemDescription}</p>
                                  <p>Quantity: {item.quantity}</p>
                                  <p>Price: {item.price}</p>
                                  <p>
                                    Order Status: <b>{item.status}</b>
                                  </p>
                                </div>
                              </Grid>
                            </Grid>
                            <Divider
                              style={{
                                color: "#f00538",
                                height: 10,
                              }}
                            ></Divider>
                          </>
                        );
                      })}
                  </Card>
                </Grid>
                {viewMode == "history" && (
                  <Grid item xs={12}>
                    <Card title="Order History">
                      <div className="order-history">
                        <List
                          itemLayout="horizontal"
                          dataSource={recentOrderList}
                          renderItem={(item, index) => (
                            <List.Item>
                              <List.Item.Meta
                                avatar={
                                  <Avatar
                                    sx={{ width: 56, height: 56 }}
                                    variant="rounded"
                                    src={itemImage2}
                                  />
                                }
                                title={item.itemName}
                                description={
                                  <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                      Quantity: {item.quantity}
                                    </Grid>
                                    <Grid item xs={12}>
                                      Price: {item.price}
                                    </Grid>
                                    <Grid item xs={12}>
                                      Order Status: {item.status}
                                    </Grid>
                                  </Grid>
                                }
                              />
                            </List.Item>
                          )}
                        />
                      </div>
                    </Card>
                  </Grid>
                )}
              </Grid>
            </Grid>
            <Grid item xs={4}>
              {response != undefined && (
                <Card title="General Info">
                  <div className="general-info">
                    <div className="profile-personal">
                      <div className="info-date">
                        <p>Name: {response.fullName}</p>
                        <p>Email: {response.email}</p>
                        <p>Phone: {response.phone}</p>
                      </div>
                    </div>
                    <Divider
                      style={{
                        color: "#f00538",
                        height: 10,
                      }}
                    ></Divider>
                    <div className="profile-personal">
                      <div className="info-date">
                        <p>Address: {response.address}</p>
                        <p>Sub-city: {response.subCity}</p>
                        {response.town == "" ? (
                          ""
                        ) : (
                          <p>Town: {response.town}</p>
                        )}
                      </div>
                    </div>
                    <Divider
                      style={{
                        color: "#f00538",
                        height: 10,
                      }}
                    ></Divider>
                    {totalOrderResponse != undefined && (
                      <div className="profile-personal">
                        <div className="info-date">
                          <p>
                            On the way Order: {totalOrderResponse.ongoingOrder}
                          </p>
                          <p>
                            Delivered Order: {totalOrderResponse.deliveredOrder}
                          </p>
                          <p>
                            Pending Order: {totalOrderResponse.pendingOrder}
                          </p>
                          <p>Total Order: {totalOrderResponse.totalOrder}</p>
                        </div>
                      </div>
                    )}

                    <Divider
                      style={{
                        color: "#f00538",
                        height: 10,
                      }}
                    ></Divider>
                    <div className="profile-setting">
                      <Button
                        className="btn-setting"
                        variant="contained"
                        color="error"
                        size="small"
                        startIcon={<HistoryIcon />}
                        onClick={() => setViewMode("history")}
                      >
                        Order History
                      </Button>
                    </div>
                  </div>
                </Card>
              )}
            </Grid>
          </Grid>
        </div>
      </Box>
      <Box>
        <section>
          <Footer />
        </section>
      </Box>
    </Box>
  );
};

export default OrderTracking;
