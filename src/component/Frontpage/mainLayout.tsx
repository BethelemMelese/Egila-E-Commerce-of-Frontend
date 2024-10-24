import axios from "axios";
import { useState, useEffect } from "react";
import { appUrl } from "../../appurl";
import Images from "../../Images/Logo 5.png";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingCart from "./shoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { Badge, Avatar } from "@mui/material";
import { Drawer } from "antd";
import { Link, NavLink } from "react-router-dom";

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
  const [isOpen, setIsOpen] = useState(false);
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

  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState);
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
            <li>
              <NavLink to="/contactus" className="nav-item" onClick={toggleMenu}>
                Contact Us
              </NavLink>
            </li>
            <li className="account">
              <Link
                to="register"
                className="nav-item account"
                onClick={toggleMenu}
                style={{ color: "#ff7f16" }}
              >
                Sign Up
              </Link>
              <p> | Already Have an Account? </p>
              <Link
                to="login"
                className="nav-item account"
                onClick={toggleMenu}
                style={{ color: "#f00538" }}
              >
                Sign In
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navmenu;
