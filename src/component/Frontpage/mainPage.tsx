import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import MoreCategory from "./moreCategory";
import MainLayout from "./mainLayout";
import Footer from "./footerSide";
import { Card, Col, Row } from "antd";
import { Grid, Divider, Button, Paper } from "@mui/material";
import { Dialogs } from "../../commonComponent/dialog";
import axios from "axios";
import { appUrl } from "../../appurl";
import Notification from "../../commonComponent/notification";

const MainPage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMore, setSelectedMore] = useState<any>([]);
  const [response, setResponse] = useState<any>([]);
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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <MainLayout />
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

      <Box sx={{ backgroundColor: "#efefef" }}>
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
                                `itemCategorys/uploads/${item.categoryImage}`
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
                                  <b> {item.categoryName}</b>
                                  <br />
                                  {item.categoryDescription}
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
        </Card>

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
      </Box>
      <Notification notify={notify} setNotify={setNotify} />
      <Box>
        <Footer />
      </Box>
      <Box>
        <div className="copyrightholder">
          <p>&copy; 2024 Egila Gadgets. All rights reserved</p>
        </div>
      </Box>
    </Box>
  );
};

export default MainPage;
