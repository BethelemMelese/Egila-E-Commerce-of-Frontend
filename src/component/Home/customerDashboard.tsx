import { Grid, Paper, Avatar } from "@mui/material";
import { Card, List } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { token, appUrl } from "../../appurl";

const CustomerDashboard = () => {
  const [currentCategory, setCurrentCategory] = useState<any>(null);
  const [currentItem, setCurrentItem] = useState<any>(null);
  const [currentOrder, setCurrentOrder] = useState<any>(null);
  const [currentNewArrival, setCurrentNewArrival] = useState<any>(null);
  const uuId = localStorage.getItem("UUCartId");

  useEffect(() => {
    axios
      .create({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .get(appUrl + `dashboard/currentCategories`)
      .then((response) => {
        setCurrentCategory(response.data);
      })
      .catch((error) => setCurrentCategory(error.response.data.message));
  }, []);

  useEffect(() => {
    axios
      .create({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .get(appUrl + `dashboard/currentItems`)
      .then((response) => {
        setCurrentItem(response.data);
      })
      .catch((error) => setCurrentItem(error.response.data.message));
  }, []);

  useEffect(() => {
    axios
      .create({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .get(appUrl + `dashboard/currentOrder/${uuId}`)
      .then((response) => {
        setCurrentOrder(response.data);
      })
      .catch((error) => setCurrentOrder(error.response.data.message));
  }, []);

  useEffect(() => {
    axios
      .create({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .get(appUrl + `dashboard/currentNewArrival`)
      .then((response) => {
        setCurrentNewArrival(response.data);
      })
      .catch((error) => setCurrentNewArrival(error.response.data.message));
  }, []);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Paper elevation={2}>
              <Card title="Your Orders" style={{ height: 440 }}>
                {currentOrder != null && (
                  <List
                    itemLayout="vertical"
                    size="small"
                    dataSource={currentOrder}
                    pagination={{
                      pageSize: 2,
                    }}
                    renderItem={(item: any, index) => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={
                            <Avatar
                              variant="rounded"
                              src={appUrl + `items/uploads/${item.itemImage}`}
                            />
                          }
                          title={<a>{item.itemName}</a>}
                          description={item.itemDescription}
                        />
                      </List.Item>
                    )}
                  />
                )}
              </Card>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper elevation={2}>
              <Card title="New Arrivals" style={{ height: 440 }}>
                {currentNewArrival != null && (
                  <List
                    itemLayout="vertical"
                    size="small"
                    dataSource={currentNewArrival}
                    pagination={{
                      pageSize: 2,
                    }}
                    renderItem={(item: any, index) => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={
                            <Avatar
                              variant="rounded"
                              src={appUrl + `items/uploads/${item.itemImage}`}
                            />
                          }
                          title={<a>{item.itemName}</a>}
                          description={item.itemDescription}
                        />
                      </List.Item>
                    )}
                  />
                )}
              </Card>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Paper elevation={2}>
              {" "}
              <Card title="Categories" style={{ height: 440 }}>
                {currentCategory != null && (
                  <List
                    itemLayout="vertical"
                    size="small"
                    dataSource={currentCategory}
                    pagination={{
                      pageSize: 2,
                    }}
                    renderItem={(item: any, index) => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={
                            <Avatar
                              variant="rounded"
                              src={
                                appUrl +
                                `itemCategorys/uploads/${item.categoryImage}`
                              }
                            />
                          }
                          title={<a>{item.categoryName}</a>}
                          description={item.categoryDescription}
                        />
                      </List.Item>
                    )}
                  />
                )}
              </Card>
            </Paper>
          </Grid>
          <Grid item xs={8}>
            <Paper elevation={2}>
              <Card title="Items" style={{ height: 440 }}>
                {currentItem != null && (
                  <List
                    itemLayout="vertical"
                    size="small"
                    dataSource={currentItem}
                    pagination={{
                      pageSize: 2,
                    }}
                    renderItem={(item: any, index) => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={
                            <Avatar
                              variant="rounded"
                              src={appUrl + `items/uploads/${item.itemImage}`}
                            />
                          }
                          title={<a>{item.itemName}</a>}
                          description={item.itemDescription}
                        />
                      </List.Item>
                    )}
                  />
                )}
              </Card>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CustomerDashboard;
