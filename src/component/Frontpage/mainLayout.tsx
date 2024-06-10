import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Images from "../../Images/Logo 5.png";
import { IconButton, Button, Badge, Avatar } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingCart from "./shoppingCart";
import { Drawer } from "antd";
import axios from "axios";
import { appUrl } from "../../appurl";

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
  paddingTop: theme.spacing(-1),
  paddingBottom: theme.spacing(-1),
  "@media all": {
    minHeight: 60,
  },
}));

const navItems = [
  {
    key: 1,
    name: "Home",
    route: "",
  },
  {
    key: 2,
    name: "New Arrival",
    route: "newArrival",
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

const MainLayout = () => {
  const [open, setOpen] = useState(false);
  const [counter, setCounter] = useState(0);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onFetchError = (response: any) => {
    setNotify({
      isOpen: true,
      type: "error",
      message: response,
    });
  };

  useEffect(() => {
    const uUId = localStorage.getItem("UUCartId");
    axios
      .get(appUrl + "carts/count/" + uUId)
      .then((response) => setCounter(response.data.counts))
      .catch((error) => onFetchError(error.response.data.message));
  }, []);

  return (
    <Box sx={{ flexGrow: 0 }}>
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
              fontSize: "3rem",
              fontWeight: 100,
            }}
          >
            {navItems.map((item) => (
              <>
                <Button
                  key={item.key}
                  style={{
                    color: "#000",
                    marginLeft: 50,
                    marginTop: 6,
                    fontFamily: "inherit",
                    fontSize: 15,
                    // width:120
                  }}
                  href={`/${item.route}`}
                >
                  <b> {item.name}</b>
                </Button>
              </>
            ))}
          </Typography>

          <div>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search Item ..."
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </div>

          <Badge badgeContent={counter} color="success" overlap="circular">
            <Avatar
              onClick={showDrawer}
              sx={{ color: "#000", backgroundColor: "#fff" }}
            >
              <ShoppingCartIcon />
            </Avatar>
          </Badge>

          <Drawer
            title="Shopping Cart"
            onClose={onClose}
            open={open}
            width={500}
          >
            <ShoppingCart />
          </Drawer>
        </StyledToolbar>
      </AppBar>
    </Box>
  );
};

export default MainLayout;
