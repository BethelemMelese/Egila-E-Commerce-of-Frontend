import { Grid, Typography } from "@mui/material";
import { Avatar, Card, List, Tooltip } from "antd";
import PersonIcon from "@mui/icons-material/Person";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AppShortcutIcon from "@mui/icons-material/AppShortcut";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";

const data = [
  {
    title: "Order One",
  },
  {
    title: "Order Two",
  },
  {
    title: "Order Three",
  },
  {
    title: "Order Four",
  },
];

const dataAreaChart = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

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
const data02 = [
  {
    name: "Group A",
    value: 2400,
  },
  {
    name: "Group B",
    value: 4567,
  },
  {
    name: "Group C",
    value: 1398,
  },
  {
    name: "Group D",
    value: 9800,
  },
  {
    name: "Group E",
    value: 3908,
  },
  {
    name: "Group F",
    value: 4800,
  },
];

const dataForList = Array.from({ length: 23 }).map((_, i) => ({
  href: "https://ant.design",
  title: `ant design part ${i}`,
  avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
  description:
    "Ant Design, a design language for background applications, is refined by Ant UED Team.",
  content:
    "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
}));

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-page">
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
                          <b>10</b>
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
                          <b>4</b>
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
                          <b>10</b>
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
                          <b>30</b>
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
                <Card className="card-item" title="Recent Order">
                  <List
                    itemLayout="vertical"
                    size="small"
                    dataSource={data}
                    pagination={{
                      pageSize: 2,
                    }}
                    renderItem={(item, index) => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={
                            <Avatar
                              src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                            />
                          }
                          title={<a href="https://ant.design">{item.title}</a>}
                          description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                        />
                      </List.Item>
                    )}
                  />
                </Card>
              </Grid>
              <Grid item xs={8}>
                <Card className="card-item" title="Sales">
                  <div ></div>
                  <AreaChart
                    width={780}
                    height={325}
                    data={dataAreaChart}
                    className="area-chart"
                    margin={{ top: 10, right: 30, left:0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#f00538"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#f00538"
                          stopOpacity={0}
                        />
                      </linearGradient>
                      <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#ff7f16"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#ff7f16"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="uv"
                      stroke="#f00538"
                      fillOpacity={1}
                      fill="url(#colorUv)"
                    />
                    <Area
                      type="monotone"
                      dataKey="pv"
                      stroke="#ff7f16"
                      fillOpacity={1}
                      fill="url(#colorPv)"
                    />
                  </AreaChart>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Card className="card-item" title="Top Ordered Products">
                  <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                      pageSize: 2,
                    }}
                    dataSource={dataForList}
                    renderItem={(item) => (
                      <List.Item
                        key={item.title}
                        // extra={
                        //   <img
                        //     width={272}
                        //     alt="logo"
                        //     src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                        //   />
                        // }
                      >
                        <List.Item.Meta
                          avatar={<Avatar src={item.avatar} />}
                          title={<a href={item.href}>{item.title}</a>}
                          description={item.description}
                        />
                      </List.Item>
                    )}
                  />
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Card className="card-item" title="New Arrival Items">
                  {/* OPtional for the new arrival items can't be display in pie chart but just normal description */}
                  {/* to display the total items, total orders and total sales */}
                  <PieChart width={400} height={240}>
                    <Pie
                      data={data01}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={50}
                      fill="#f00538"
                    />
                    <Pie
                      data={data02}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#ff7f16"
                      label
                    />
                  </PieChart>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Home;
