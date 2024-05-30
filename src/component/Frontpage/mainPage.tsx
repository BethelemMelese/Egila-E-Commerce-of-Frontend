import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Images from "../../Images/Logo 5.png";
import Images2 from "../../Images/image.jpg";
import Footer from "./footerSide";
import MoreCategory from "./moreCategory";
import { Card, Col, Row, Avatar } from "antd";
import { IconButton, Grid, Divider, Button, Paper } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge, { BadgeProps } from "@mui/material/Badge";
import {Dialogs} from "../../commonComponent/dialog";

const { Meta } = Card;

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

const navItems = [
  {
    key: 1,
    name: "Home",
    route: "/",
  },
  {
    key: 2,
    name: "New Arrival",
    route: "NewArrival",
  },
  {
    key: 3,
    name: "Category",
    route: "Category",
  },
  {
    key: 4,
    name: "Login",
    route: "login",
  },
];

const ModeDateForCategory = [
  {
    id: 1,
    categoryName: "The First Category",
    categoryDescription: "The First Category Description",
    categoryImage: "../../Images/pcsSecond.jpg",
    items: [],
  },
  {
    id: 2,
    categoryName: "The Second Category",
    categoryDescription: "The Second Category Description",
    categoryImage: "../../Images/Iphones.jpg",
    items: [],
  },
  {
    id: 3,
    categoryName: "The Third Category",
    categoryDescription: "The Third Category Description",
    categoryImage: "../../Images/carlos-muza.jpg",
    items: [],
  },
  {
    id: 4,
    categoryName: "The Fourth Category",
    categoryDescription: "The Fourth Category Description",
    categoryImage: "../../Images/brad-pouncy.jpg",
    items: [],
  },
  {
    id: 5,
    categoryName: "The Five Category",
    categoryDescription: "The Five Category Description",
    categoryImage: "../../Images/james-lewis.jpg",
    items: [],
  },
  {
    id: 6,
    categoryName: "The Six Category",
    categoryDescription: "The Six Category Description",
    categoryImage: "../../Images/james-lewis.jpg",
    items: [],
  },
];

const MainPage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMore, setSelectedMore] = useState();

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
              fontWeight: 100,
            }}
          >
            {navItems.map((item) => (
              <Button
                key={item.key}
                style={{
                  color: "#000",
                  marginLeft: 4,
                  marginTop: 6,
                  fontFamily: "inherit",
                  fontSize: 15,
                }}
                href={`/${item.route}`}
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

          <IconButton sx={{ color: "#000", backgroundColor: "#fff" }}>
            {/* <StyledBadge badgeContent={4} color="warning"> */}
            <ShoppingCartIcon />
            {/* </StyledBadge> */}
          </IconButton>
        </StyledToolbar>
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

      <Box sx={{ backgroundColor: "rgba(234, 232, 232, 0.926)" }}>
        <Card className="image-slid">
          <Row gutter={18}>
            {ModeDateForCategory.map((item: any) => {
              return (
                <Col span={6} style={{ marginTop: "20px" }}>
                  <Paper elevation={8}>
                    <div className="responsive">
                      <div className="gallery">
                        <img
                          src={Images2}
                          alt="Cinque Terre"
                          width="300"
                          height="250"
                          style={{ maxHeight: "300" }}
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

      {/* <Box>
        <Footer />
      </Box> */}
      <Box>
        <div className="copyrightholder">
          <p>&copy; 2024 Egila Gadgets. All rights reserved</p>
        </div>
      </Box>
    </Box>
  );
};

export default MainPage;
