import React, { useEffect, useState } from "react";
import MainLayout from "./mainLayout";
import axios from "axios";
import { appUrl } from "../../appurl";
import { Grid, Paper, AppBar, Box } from "@mui/material";
import { Card, Col, Input, Row } from "antd";

const NewArrival = () => {
  const [response, setResponse] = useState<any>([]);
  const [query, setQuery] = useState(""); // for search purpose to get the key

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
      .get(appUrl + `items/newArrival?search=${query}`)
      .then((response) => setResponse(response.data))
      .catch((error) => onFetchError(error.response.data.message));
  }, [query]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <MainLayout />
      </AppBar>

      <Box sx={{ backgroundColor: "#efefef" }}>
        <div className="arrival-container">
          <Paper elevation={3}>
            <Card>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Card className="arrival-search">
                    <Input
                      className="input-search"
                      placeholder="input search text"
                      addonAfter={<b>Search</b>}
                      onKeyUp={(event: any) => onSearch(event.target.value)}
                    />
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <Card className="image-slid">
                    <Row gutter={18}>
                      {response != undefined && (
                        <>
                          {response.map((item: any) => {
                            return (
                              <Col span={6} style={{ marginTop: "20px" }}>
                                <Paper elevation={8}>
                                  <div className="responsive">
                                    <div className="gallery">
                                      <img
                                        src={
                                          appUrl +
                                          `items/uploads/${item.itemImage}`
                                        }
                                        alt="Category Image"
                                        width="100px"
                                        height="250px"
                                        style={{
                                          maxWidth: "720px",
                                          maxHeight: "500px",
                                        }}
                                      />
                                      <div className="desc">
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
                </Grid>
              </Grid>
            </Card>
          </Paper>
        </div>
      </Box>

      <Box>
        <div className="copyrightholder">
          <p>&copy; 2024 Egila Gadgets. All rights reserved</p>
        </div>
      </Box>
    </Box>
  );
};

export default NewArrival;
