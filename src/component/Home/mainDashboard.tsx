import { Grid, Typography, Avatar } from "@mui/material";
import { Card, List, Tooltip } from "antd";
import PersonIcon from "@mui/icons-material/Person";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Pie,
  PieChart,
  XAxis,
  YAxis,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AppShortcutIcon from "@mui/icons-material/AppShortcut";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import { useEffect, useState } from "react";
import axios from "axios";
import { appUrl } from "../../appurl";

const data01 = [
  {
    name: "Group A",
    value: 400,
  },
  {
    name: "Group B",
    value: 300,
  },
  {
    name: "Group C",
    value: 300,
  },
  {
    name: "Group D",
    value: 200,
  },
  {
    name: "Group E",
    value: 278,
  },
  {
    name: "Group F",
    value: 189,
  },
];

const MainDashboard = () => {
  const [countCustomer, setCountCustomer] = useState(null);
  const [countOrder, setCountOrder] = useState(null);
  const [countSales, setCountSales] = useState(null);
  const [countDeliveries, setCountDeliveries] = useState(null);
  const [recentOrder, setRecentOrder] = useState<any>(null);
  const [salesList, setSalesList] = useState<any>(null);
  const [orderData, setOrderData] = useState<any>([]);
  const [report, setReport] = useState<any>({});
  // Colors for pie chart slices
  const COLORS = ["#0088FE", "#FFBB28", "#FF8042"];

  console.log("orderData...", orderData);
  // Fetch the order report
  useEffect(() => {
    setOrderData([
      { name: "Delivered Orders", value: 100 },
      { name: "Ongoing Orders", value: 50 },
      { name: "Pending Orders", value: 20 },
    ]);
    // const fetchData = async () => {
    //   try {
    //     const response = await axios
    //       .create({
    //         headers: {
    //           Authorization: `Bearer ${localStorage.getItem("token")}`,
    //         },
    //       })
    //       .get(appUrl + `dashboard/getOrders`);
    //     const { totalOrders, deliveredOrders, ongoingOrders, pendingOrders } =
    //       response.data;

    //     // Format the data for Recharts
    //     setOrderData([
    //       { name: "Delivered Orders", value: 12 },
    //       { name: "Ongoing Orders", value: 10 },
    //       { name: "Pending Orders", value: 5 },
    //       // { name: "Total Orders", value: 10 },
    //     ]);
    //   } catch (error) {
    //     console.error("Error fetching order report:", error);
    //   }
    // };

    // fetchData();
  }, []);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const [salesRes, customersRes, deliveryRes] = await Promise.all([
          axios
            .create({
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            })
            .get(appUrl + `dashboard/getSales`),
          axios
            .create({
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            })
            .get(appUrl + `dashboard/getCustomers`),
          axios
            .create({
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            })
            .get(appUrl + `dashboard/getDelivery`),
        ]);

        setReport({
          sales: salesRes.data,
          customers: customersRes.data,
          delivery: deliveryRes.data,
        });
      } catch (error) {
        console.error("Error fetching report:", error);
      }
    };

    fetchReport();
  }, []);

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
                <Grid item xs={12}>
                  <div className="card-uniq">
                    <div className="card-count">
                      <div className="card-icon">
                        <PersonIcon fontSize="medium" />
                      </div>
                      <div className="card-title">
                        <Typography variant="h6" gutterBottom color="black">
                          <b>{countCustomer == null ? 0 : countCustomer}</b>
                        </Typography>
                      </div>
                    </div>
                    <div className="card-subTitle">
                      <h3>Customers</h3>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div className="card-des">
                    <p>Number of Customers that registered here.</p>
                  </div>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card className="card-item">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <div className="card-uniq">
                    <div className="card-count">
                      <div className="card-icon">
                        <AppShortcutIcon fontSize="medium" />
                      </div>
                      <div className="card-title">
                        <Typography variant="h6" gutterBottom color="black">
                          <b>{countOrder == null ? 0 : countOrder}</b>
                        </Typography>
                      </div>
                    </div>
                    <div className="card-subTitle">
                      <h3>Orders</h3>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div className="card-des">
                    <p>Number of orders that make by customers.</p>
                  </div>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card className="card-item">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <div className="card-uniq">
                    <div className="card-count">
                      <div className="card-icon">
                        <ReceiptIcon fontSize="medium" />
                      </div>
                      <div className="card-title">
                        <Typography variant="h6" gutterBottom color="black">
                          <b>{countSales == null ? 0 : countSales}</b>
                        </Typography>
                      </div>
                    </div>
                    <div className="card-subTitle">
                      <h3>Sales</h3>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div className="card-des">
                    <p>Number of sales person that registered here.</p>
                  </div>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card className="card-item">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <div className="card-uniq">
                    <div className="card-count">
                      <div className="card-icon">
                        <DeliveryDiningIcon fontSize="medium" />
                      </div>
                      <div className="card-title">
                        <Typography variant="h6" gutterBottom color="black">
                          <b>{countDeliveries == null ? 0 : countDeliveries}</b>
                        </Typography>
                      </div>
                    </div>
                    <div className="card-subTitle">
                      <h3>Delivery's</h3>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div className="card-des">
                    <p>Number of Delivery's that registered here.</p>
                  </div>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          {/* <Grid item xs={12} md={6}>
            <Card style={{ width: "100%", height: 400 }}>
              <h3>Order Report</h3>
              {orderData.length > 0 && (
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={orderData}
                      dataKey="value"
                      nameKey="name"
                      cx="10%"
                      cy="10%"
                      outerRadius={10}
                      fill="#f6c59d"
                      label
                    >
                      {orderData.map((entry: any, index: number) => {
                        return (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        );
                      })}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <h3>Sales Report</h3>
              <p>Total Sales: ${report.sales?.totalSales || 0}</p>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <h3>Customers Report</h3>
              <p>Total Customers: {report.customers?.totalCustomers || 0}</p>
              <h4>Recent Customers:</h4>
              <ul>
                {report.customers?.recentCustomers?.map((customer: any) => (
                  <li key={customer._id}>{customer.fullName}</li>
                ))}
              </ul>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <h3>Delivery Report</h3>
              <p>
                Total Delivery Persons:{" "}
                {report.delivery?.totalDeliveryPersons || 0}
              </p>
              <p>Active Deliveries: {report.delivery?.activeDeliveries || 0}</p>
            </Card>
          </Grid> */}
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
