import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Navmenu from "./mainLayout";
import axios from "axios";
import { appUrl } from "../../appurl";
import {
  Grid,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Typography,
  Button,
  Tooltip,
} from "@mui/material";
import { Card, Col, Input, List, Row } from "antd";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { v4 as uuidv4 } from "uuid";
import Footer from "./footerSide";

const Category = () => {
  const [itemResponse, setItemResponse] = useState<any>([]);
  const [categoryResponse, setCategoryResponse] = useState<any>([]);
  const [categorySelected, setCategorySelected] = useState<any>("");
  const [query, setQuery] = useState(""); // for search purpose to get the key
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

  //   For searching based on the content
  const onSearch = (query: any) => {
    setQuery(query);
  };

  useEffect(() => {
    axios
      .get(appUrl + "itemCategorys/names")
      .then((response) => setCategoryResponse(response.data))
      .catch((error) => onFetchError(error.response.data.message));
  }, []);

  useEffect(() => {
    axios
      .get(
        appUrl + `items/categorySearch?id=${categorySelected}&&search=${query}`
      )
      .then((response) => setItemResponse(response.data))
      .catch((error) => onFetchError(error.response.data.message));
  }, [categorySelected, query]);

  const Restore = () => {
    axios
      .get(appUrl + `items/categorySearch?id=${""}&&search=${""}`)
      .then((response) => setItemResponse(response.data))
      .catch((error) => onFetchError(error.response.data.message));
  };

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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Navmenu inputValue={(value: any) => setGetKey(value)} />
      </AppBar>

      <Box sx={{ backgroundColor: "#efefef" }}>
        <div className="category-container">
          {/* <Paper elevation={3}> */}
            {/* <Card> */}
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  {/* <Paper elevation={2}> */}
                    <Card
                      title="Category List"
                      extra={
                        <Button onClick={Restore} color="warning">
                          Restore
                        </Button>
                      }
                    >
                      {categoryResponse.map((item: any) => {
                        return (
                          <MenuList className="category-list">
                            <MenuItem
                              onClick={() => setCategorySelected(item.id)}
                            >
                              <ListItemText className="category-menu">
                                <Typography variant="body1">
                                  {item.categoryName}
                                </Typography>
                              </ListItemText>
                              <br />
                            </MenuItem>
                          </MenuList>
                        );
                      })}
                    </Card>
                  {/* </Paper> */}
                </Grid>

                <Grid item xs={9} className="category-displays">
                  {/* <Paper elevation={2}> */}
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Card className="category-search">
                          <Input
                            className="input-search"
                            placeholder="input search text"
                            addonAfter={<b>Search</b>}
                            onKeyUp={(event: any) =>
                              onSearch(event.target.value)
                            }
                          />
                        </Card>
                      </Grid>
                      <Grid item xs={12}>
                        <Card className="image-slid">
                          <Row gutter={8}>
                            {itemResponse != undefined && (
                              <>
                                {itemResponse.map((item: any) => {
                                  return (
                                    <Col span={8} style={{ marginTop: "20px" }}>
                                      <Paper elevation={8}>
                                        <div className="responsive">
                                          <div className="category-gallery">
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
                                                  onClick={() =>
                                                    OnAddCart(item.id)
                                                  }
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
                                                  Brand: {item.brand}
                                                  <br />
                                                  Quantity: {item.quantity}
                                                  <br />
                                                  <h4 style={{ float: "left" }}>
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
                      </Grid>
                    </Grid>
                  {/* </Paper> */}
                </Grid>
              </Grid>
            {/* </Card> */}
          {/* </Paper> */}
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

export default Category;
