import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Images from "../../Images/Logo 5.png";
import Footer from "./footerSide";
import { Card, Col, Row } from "antd";
import { IconButton, Grid, Divider } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge, { BadgeProps } from '@mui/material/Badge';

const { Meta } = Card;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "white",
  color: "black",
  marginRight: theme.spacing(5),
  marginLeft: 2,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(5),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 1),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "40ch",
    },
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: "center",
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  "@media all": {
    minHeight: 94,
  },
}));

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `1px solid ${theme.palette.background.paper}`,
    padding: "0 1px",
  },
}));


const navItems=[{
  key:1,
  name:"Home",
  route:"Home",
},{
  key:2,
  name:"Products",
  route:"Products",
},{
  key:1,
  name:"New Arrival",
  route:"NewArrival",
},{
  key:1,
  name:"Category",
  route:"Category",
},{
  key:1,
  name:"Login",
  route:"login",
},]
const MainPage = (props: Props) => {

  const onHandleEvent=(value:any)=>{
    <a href={`/${value}`}></a>
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <StyledToolbar>
          <div>
            <img
              alt="Egila"
              src={Images}
              style={{ height: 100, marginTop: 1, marginBottom: 1 }}
            />
          </div>

          <Typography
            variant="h5"
            sx={{
              flexGrow: 1,
              alignSelf: "flex-end",
              fontFamily: "inherit",
              fontSize: "1rem",
              fontWeight: 200,
            }}
          >
            {navItems.map((item) => (
              <Button
                key={item.key}
                sx={{
                  color: "#000",
                  marginLeft: 4,
                  marginTop: 6,
                  fontFamily: "inherit",
                  fontSize: 15,
                }}
                onClick={()=>onHandleEvent(item.route)}
              >
                <b> {item.name}</b>
              </Button>
            ))}
          </Typography>

          <div>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </div>

          <IconButton
            sx={{ color: "#000", backgroundColor: "#fff" }}
          >
            {/* <StyledBadge badgeContent={4} color="warning"> */}
              <ShoppingCartIcon />
            {/* </StyledBadge> */}
          </IconButton>
        </StyledToolbar>
      </AppBar>

      <Box>
        <div className="main-image">
          <div className="main-text">
            <div className="services">
              <Grid container spacing={1}>
                <Grid item xs={3}>
                  <h2>Free Delivery</h2>
                </Grid>
                <Divider orientation="vertical" variant="middle" flexItem />
                <Grid item xs={3}>
                  <h2>24 / 7 Availability</h2>
                </Grid>
                <Divider orientation="vertical" variant="middle" flexItem />
                <Grid item xs={3}>
                  <h2>Customer Satisfaction</h2>
                </Grid>
                <Divider orientation="vertical" variant="middle" flexItem />
                <Grid item xs={2}>
                  <h2>Easy To use</h2>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </Box>

      <Box sx={{ backgroundColor: "rgba(234, 232, 232, 0.926)" }}>
        <Card className="image-slid">
          <Row gutter={16}>
            <Col span={6}>
              <Card
                hoverable
                style={{ width: 240 }}
                cover={
                  <img
                    alt="example"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                }
              >
                <Meta
                  title="Europe Street beat"
                  description="www.instagram.com"
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card
                hoverable
                style={{ width: 240 }}
                cover={
                  <img
                    alt="example"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                }
              >
                <Meta
                  title="Europe Street beat"
                  description="www.instagram.com"
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card
                hoverable
                style={{ width: 240 }}
                cover={
                  <img
                    alt="example"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                }
              >
                <Meta
                  title="Europe Street beat"
                  description="www.instagram.com"
                />
              </Card>
            </Col>
          </Row>
        </Card>
      </Box>
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
