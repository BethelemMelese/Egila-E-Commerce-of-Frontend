import axios from "axios";
import { useState, useEffect } from "react";
import { appUrl } from "../../appurl";
import Images from "../../Images/Logo 5.png";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingCart from "./shoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { Badge, Avatar, IconButton, Tooltip, Button } from "@mui/material";
import { Drawer} from "antd";
import { Link, NavLink } from "react-router-dom";
import ProfileView from "../Profile";
import LogoutIcon from "@mui/icons-material/Logout";

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

const Navmenu = ({ ...props }) => {
  const [open, setOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [counter, setCounter] = useState(0);
  const [currentCustomer, setCurrentCustomer] = useState<any>("");
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

  // for Profile Drawer
  const showDrawerForProfile = () => {
    setOpenProfile(true);
  };

  const onCloseProfile = () => {
    setOpenProfile(false);
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

  useEffect(() => {
    axios
      .create({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .get(appUrl + `users/UserInfo/${localStorage.getItem("token")}`)
      .then((response: any) => setCurrentCustomer(response.data))
      .catch((error: any) => onFetchError(error));
  }, []);

  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState);
  };

  const onLogout = () => {
    localStorage.removeItem("controller");
    localStorage.removeItem("permission");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="navmenu-container">
      <div className="top-bar">
        <div className="top-bar-logo">
          <img alt="Egila Logo" src={Images} />
        </div>

        <div className="search-cart">
          <div className="search-box">
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search Item ..."
                inputProps={{ "aria-label": "search" }}
                onKeyUp={(event: any) => props.inputValue(event.target.value)}
              />
            </Search>
          </div>
          <div className="cart-box">
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
          </div>
          {localStorage.getItem("role") == "Customer" && (
            <div className="pp-account">
              <Tooltip title="Account settings">
                <IconButton onClick={() => showDrawerForProfile()} size="small">
                  {currentCustomer != undefined && (
                    <>
                      <Badge
                        badgeContent={currentCustomer.username}
                        color="success"
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                      >
                        {currentCustomer.profileImage != undefined && (
                          <Avatar
                            src={currentCustomer.profileImage}
                            sx={{ width: 40, height: 40 }}
                          ></Avatar>
                        )}
                        {currentCustomer.profileImage == undefined && (
                          <Avatar sx={{ width: 40, height: 40 }}></Avatar>
                        )}
                      </Badge>
                    </>
                  )}
                </IconButton>
              </Tooltip>
              <Drawer
                title="Profile"
                placement="left"
                width={500}
                onClose={onCloseProfile}
                open={openProfile}
                extra={
                  <Button
                    variant="text"
                    className="btn-setting"
                    color="error"
                    size="small"
                    startIcon={<LogoutIcon />}
                    onClick={onLogout}
                  >
                    Logout
                  </Button>
                }
              >
                <ProfileView currentCustomer={currentCustomer} />
              </Drawer>
            </div>
          )}
        </div>
      </div>
      <div className="nav-bar">
        <nav className="main-nav-menu">
          <ul className={`nav-item-menu ${isOpen ? "open" : ""}`}>
            <li>
              <NavLink to="/" className="nav-item" onClick={toggleMenu}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/category" className="nav-item" onClick={toggleMenu}>
                Category
              </NavLink>
            </li>
            {localStorage.getItem("role") == "Customer" && (
              <li>
                <NavLink to="/orderTracking" className="nav-item" onClick={toggleMenu}>
                  Order
                </NavLink>
              </li>
            )}

            <li>
              <NavLink
                to="/contactus"
                className="nav-item"
                onClick={toggleMenu}
              >
                Contact Us
              </NavLink>
            </li>
            {localStorage.getItem("role") != "Customer" && (
              <li className="account">
                <NavLink
                  to="/register"
                  className="nav-item account"
                  onClick={toggleMenu}
                  style={{ color: "#ff7f16" }}
                >
                  Sign Up
                </NavLink>
                <p> | Already Have an Account? </p>
                <NavLink
                  to="/login"
                  className="nav-item account"
                  onClick={toggleMenu}
                  style={{ color: "#f00538" }}
                >
                  Sign In
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navmenu;
