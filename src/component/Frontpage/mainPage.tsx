import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import MoreCategory from "./moreCategory";
import Navmenu from "./mainLayout";
import Footer from "./footerSide";
import { Card, Col, Input, Row } from "antd";
import { Grid, Divider, Button, Paper, Tooltip } from "@mui/material";
import { Dialogs } from "../../commonComponent/dialog";
import axios from "axios";
import { appUrl } from "../../appurl";
import Notification from "../../commonComponent/notification";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { v4 as uuidv4 } from "uuid";

const MainPage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMore, setSelectedMore] = useState<any>([]);
  const [response, setResponse] = useState<any>([]);
  const [itemResponse, setItemResponse] = useState<any>();
  const [arrivalResponse, setArrivalResponse] = useState<any>([]);
  const [query, setQuery] = useState("");
  const [getKey, setGetKey] = useState(null);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const onFetchError = (response: any) => {
    setNotify({
      isOpen: true,
      type: "error",
      message: response,
    });
  };

  useEffect(() => {
    axios
      .get(appUrl + "itemCategorys/names")
      .then((response) => setResponse(response.data))
      .catch((error) => onFetchError(error.response.data.message));
  }, []);

  useEffect(() => {
    if (getKey != null) {
      axios
        .get(appUrl + `items/search?search=${getKey}`)
        .then((response) => setItemResponse(response.data))
        .catch((error) => onFetchError(error.response.data.message));
    }
  }, [getKey]);

  const OnAddCart = (item: any) => {
    const uuid = uuidv4();
    const sessionCartId = localStorage.getItem("UUCartId");
    let data;
    if (sessionCartId == null) {
      data = {
        itemId: item,
        quantity: 1,
        uuId: uuid,
      };
      localStorage.setItem("UUCartId", uuid);
    } else {
      data = {
        itemId: item,
        quantity: 1,
        uuId: sessionCartId,
      };
    }
    axios
      .post(appUrl + "carts", data)
      .then((response) => window.location.reload())
      .catch((error) => onFetchError(error.response.data.message));
  };

  //   For searching based on the content
  const onSearch = (query: any) => {
    setQuery(query);
  };

  useEffect(() => {
    axios
      .get(appUrl + `items/newArrival?search=${query}`)
      .then((response) => setArrivalResponse(response.data))
      .catch((error) => onFetchError(error.response.data.message));
  }, [query]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Navmenu inputValue={(value: any) => setGetKey(value)} />
        <div className="main-image">
          <div className="main-text">
            <div className="services">
              <Grid container spacing={1}>
                <Grid item xs={3}>
                  <h2>Free Delivery</h2>
                </Grid>
                <Divider
                  orientation="vertical"
                  variant="middle"
                  flexItem
                  style={{ color: "#fff" }}
                />
                <Grid item xs={3}>
                  <h2>24 / 7 Availability</h2>
                </Grid>
                <Divider
                  orientation="vertical"
                  variant="middle"
                  flexItem
                  style={{ color: "#fff" }}
                />
                <Grid item xs={3}>
                  <h2>Customer Satisfaction</h2>
                </Grid>
                <Divider
                  orientation="vertical"
                  variant="middle"
                  flexItem
                  style={{ color: "#fff" }}
                />
                <Grid item xs={2}>
                  <h2>Easy To use</h2>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </AppBar>

      {getKey == null && (
        <Box sx={{ backgroundColor: "#efefef" }}>
          <Card className="image-slid">
            {arrivalResponse.length != 0 && (
              <Card className="arrival-container">
                <h3 className="arrival-title">New Arrived Products</h3>
                <Grid container spacing={2}>
                  <Grid item xs={12} className="arrival-images">
                    <div className="image-slid">
                      <Row gutter={18}>
                        {arrivalResponse.map((item: any) => {
                          return (
                            <Col span={6} style={{ marginTop: "20px" }}>
                              <Paper elevation={8}>
                                <div className="responsive">
                                  <div className="gallery">
                                    <div className="image-container">
                                      <img
                                        src={item.itemImage}
                                        alt="Category Image"
                                        width="100px"
                                        height="200px"
                                        style={{
                                          maxWidth: "720px",
                                          maxHeight: "500px",
                                        }}
                                      />
                                      <Tooltip title="Add To Cart">
                                        <button
                                          className="add-cart-btn"
                                          onClick={() => OnAddCart(item.id)}
                                        >
                                          <AddShoppingCartIcon />
                                        </button>
                                      </Tooltip>
                                    </div>
                                    <div className="desc">
                                      <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                          <b> {item.itemName}</b>
                                          <br />
                                          {item.itemDescription.slice(0, 100) +
                                            "..."}
                                        </Grid>
                                        <Grid item xs={12}>
                                          Brand: {item.brand}
                                          <br />
                                          Quantity: {item.quantity}
                                          <br />
                                          <h4>
                                            Price: <b> {item.price}</b>{" "}
                                          </h4>
                                        </Grid>
                                      </Grid>
                                    </div>
                                  </div>
                                </div>
                              </Paper>
                            </Col>
                          );
                        })}
                      </Row>
                    </div>
                  </Grid>
                </Grid>
              </Card>
            )}
            <Card className="new-post">
              <Row gutter={18}>
                {response != undefined && (
                  <>
                    {response.map((item: any) => {
                      return (
                        <Col span={6} style={{ marginTop: "20px" }}>
                          <Paper elevation={8}>
                            <div className="responsive">
                              <div className="arrival-gallery">
                                <img
                                  src={item.categoryImage}
                                  alt="Category Image"
                                  width="100px"
                                  height="200px"
                                  style={{
                                    maxWidth: "720px",
                                    maxHeight: "500px",
                                  }}
                                />
                                <div className="desc">
                                  <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                      <b> {item.categoryName}</b>
                                      <br />
                                      {item.categoryDescription.slice(0, 100) +
                                        "..."}
                                    </Grid>
                                    <Grid item xs={12}>
                                      <Button
                                        variant="text"
                                        size="small"
                                        className="more-btn"
                                        color="warning"
                                        onClick={() => {
                                          setSelectedMore(item);
                                          setOpenDialog(true);
                                        }}
                                      >
                                        More
                                      </Button>
                                    </Grid>
                                  </Grid>
                                </div>
                              </div>
                            </div>
                          </Paper>
                        </Col>
                      );
                    })}
                  </>
                )}
              </Row>
              <Dialogs
                openDialog={openDialog}
                setOpenDialog={openDialog}
                height="100%"
                maxHeight="435"
                children={
                  <MoreCategory
                    //@ts-ignore
                    selectedMore={selectedMore}
                    closeedit={() => setOpenDialog(false)}
                  />
                }
              />
            </Card>
            {/* <Card className="top-post">
              <h3>Top Salad Product</h3>
            </Card> */}
          </Card>
        </Box>
      )}

      {getKey != null && (
        <Box sx={{ backgroundColor: "#efefef" }}>
          <Card title="Product category's" className="image-slid">
            <Row gutter={18}>
              {itemResponse != undefined && (
                <>
                  {itemResponse.map((item: any) => {
                    return (
                      <Col span={6} style={{ marginTop: "20px" }}>
                        <Paper elevation={8}>
                          <div className="responsive">
                            <div className="gallery">
                              <img
                                src={appUrl + `items/uploads/${item.itemImage}`}
                                alt="Category Image"
                                width="100px"
                                height="250px"
                                style={{
                                  maxWidth: "720px",
                                  maxHeight: "500px",
                                }}
                              />
                              <div className="desc">
                                <Tooltip title="Add To Cart">
                                  <Button
                                    variant="text"
                                    size="small"
                                    className="more-btn"
                                    color="warning"
                                    onClick={() => OnAddCart(item.id)}
                                  >
                                    <AddShoppingCartIcon />
                                  </Button>
                                </Tooltip>
                                <Grid container spacing={2}>
                                  <Grid item xs={12}>
                                    <b> {item.itemName}</b>
                                    <br />
                                    {item.itemDescription}
                                  </Grid>
                                  <Grid item xs={12}>
                                    Brand: {item.brand}
                                    <br />
                                    Quantity: {item.quantity}
                                    <br />
                                    <h4>
                                      <b>Price: {item.price}</b>{" "}
                                    </h4>
                                  </Grid>
                                </Grid>
                              </div>
                            </div>
                          </div>
                        </Paper>
                      </Col>
                    );
                  })}
                </>
              )}
            </Row>
          </Card>
        </Box>
      )}

      <Notification notify={notify} setNotify={setNotify} />
      <Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default MainPage;
