import { Grid, Typography, Avatar } from "@mui/material";
import { Card, List, Tooltip } from "antd";
import PersonIcon from "@mui/icons-material/Person";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AppShortcutIcon from "@mui/icons-material/AppShortcut";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import { useEffect, useState } from "react";
import axios from "axios";
import { token, appUrl } from "../../appurl";

const MainDashboard = () => {
  const [countCustomer, setCountCustomer] = useState(null);
  const [countOrder, setCountOrder] = useState(null);
  const [countSales, setCountSales] = useState(null);
  const [countDeliveries, setCountDeliveries] = useState(null);
  const [recentOrder, setRecentOrder] = useState<any>(null);
  const [salesList, setSalesList] = useState<any>(null);

  useEffect(() => {
    axios
      .create({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .get(appUrl + `dashboard/countCustomer`)
      .then((response) => {
        setCountCustomer(response.data);
      })
      .catch((error) => setCountCustomer(error.response.data.message));
  }, []);

  useEffect(() => {
    axios
      .create({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .get(appUrl + `dashboard/countDeliveries`)
      .then((response) => {
        setCountDeliveries(response.data);
      })
      .catch((error) => setCountDeliveries(error.response.data.message));
  }, []);

  useEffect(() => {
    axios
      .create({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .get(appUrl + `dashboard/countSalesPerson`)
      .then((response) => {
        setCountSales(response.data);
      })
      .catch((error) => setCountSales(error.response.data.message));
  }, []);

  useEffect(() => {
    axios
      .create({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .get(appUrl + `dashboard/countOrders`)
      .then((response) => {
        setCountOrder(response.data);
      })
      .catch((error) => setCountOrder(error.response.data.message));
  }, []);

  useEffect(() => {
    axios
      .create({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .get(appUrl + `dashboard/recentOrder`)
      .then((response) => {
        setRecentOrder(response.data);
      })
      .catch((error) => setRecentOrder(error.response.data.message));
  }, []);

  useEffect(() => {
    axios
      .create({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .get(appUrl + `dashboard/salesList`)
      .then((response) => {
        setSalesList(response.data);
      })
      .catch((error) => setSalesList(error.response.data.message));
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Card className="card-item">
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <div className="card-icon">
                    <PersonIcon fontSize="medium" />
                  </div>
                </Grid>
                <Grid item xs={10}>
                  <div className="card-title">
                    <Typography variant="h6" gutterBottom color="black">
                      <b>{countCustomer == null ? 0 : countCustomer}</b>
                    </Typography>
                  </div>
                  <div className="card-subTitle">
                    <Typography
                      variant="body2"
                      component="p"
                      color="textSecondary"
                    >
                      Customers
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div className="card-des">
                    <Typography
                      variant="body2"
                      component="p"
                      color="textSecondary"
                    >
                      Number of Customers that registered here.
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card className="card-item">
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <div className="card-icon">
                    <AppShortcutIcon fontSize="medium" />
                  </div>
                </Grid>
                <Grid item xs={10}>
                  <div className="card-title">
                    <Typography variant="h6" gutterBottom color="black">
                      <b>{countOrder == null ? 0 : countOrder}</b>
                    </Typography>
                  </div>
                  <div className="card-subTitle">
                    <Typography
                      variant="body2"
                      component="p"
                      color="textSecondary"
                    >
                      Orders
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div className="card-des">
                    <Typography
                      variant="body2"
                      component="p"
                      color="textSecondary"
                    >
                      Number of orders that make by customers.
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card className="card-item">
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <div className="card-icon">
                    <ReceiptIcon fontSize="medium" />
                  </div>
                </Grid>
                <Grid item xs={10}>
                  <div className="card-title">
                    <Typography variant="h6" gutterBottom color="black">
                      <b>{countSales == null ? 0 : countSales}</b>
                    </Typography>
                  </div>
                  <div className="card-subTitle">
                    <Typography
                      variant="body2"
                      component="p"
                      color="textSecondary"
                    >
                      Sales
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div className="card-des">
                    <Typography
                      variant="body2"
                      component="p"
                      color="textSecondary"
                    >
                      Number of sales person that registered here.
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card className="card-item">
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <div className="card-icon">
                    <DeliveryDiningIcon fontSize="medium" />
                  </div>
                </Grid>
                <Grid item xs={10}>
                  <div className="card-title">
                    <Typography variant="h6" gutterBottom color="black">
                      <b>{countDeliveries == null ? 0 : countDeliveries}</b>
                    </Typography>
                  </div>
                  <div className="card-subTitle">
                    <Typography
                      variant="body2"
                      component="p"
                      color="textSecondary"
                    >
                      Delivery's
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div className="card-des">
                    <Typography
                      variant="body2"
                      component="p"
                      color="textSecondary"
                    >
                      Number of Delivery Person that registered here.
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Card
              className="card-item"
              style={{ height: 440 }}
              title="Recent Orders"
            >
              {recentOrder != null && (
                <List
                  itemLayout="vertical"
                  size="small"
                  dataSource={recentOrder}
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
          </Grid>
          <Grid item xs={8}>
            <Card className="card-item" title="Sales">
              {salesList != null && (
                <AreaChart
                  width={780}
                  height={340}
                  data={salesList}
                  className="area-chart"
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f00538" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#f00538" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ff7f16" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#ff7f16" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="quantity"
                    stroke="#f00538"
                    fillOpacity={1}
                    fill="url(#colorUv)"
                  />
                  <Area
                    type="monotone"
                    dataKey="item"
                    stroke="#ff7f16"
                    fillOpacity={1}
                    fill="url(#colorPv)"
                  />
                </AreaChart>
              )}
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MainDashboard;
