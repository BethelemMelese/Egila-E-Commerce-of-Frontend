import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Avatar, Menu, MenuItem, Tooltip } from "@mui/material";
import { userService } from "../../polices/userService";
import { useState, useEffect } from "react";
import axios from "axios";
import { appUrl } from "../../appurl";
import React from "react";
import { useNavigate } from "react-router-dom";

const AppNavBar = () => {
  const token = userService.token;
  const [userInfo, setUserInfo] = useState<any>();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const onFetchSuccess = (response: any) => {
    setUserInfo(response);
  };
  const onFetchError = (error: any) => {};

  useEffect(() => {
    axios
      .get(appUrl + `users/UserInfo/${token}`)
      .then((response: any) => onFetchSuccess(response.data))
      .catch((error: any) => onFetchError(error));
  }, []);

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("permission");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: "none", md: "flex" }, color: "#000" }}>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={17} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              {userInfo != undefined && (
                <>
                  <Badge
                    badgeContent={userInfo.firstName}
                    color="warning"
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                  >
                    <Avatar
                      src={appUrl + `users/uploads/${userInfo.profileImage}`}
                      sx={{ width: 50, height: 50 }}
                    ></Avatar>
                  </Badge>
                </>
              )}
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={() => navigate("/egila/setting")}>
              Setting
            </MenuItem>
            <MenuItem onClick={logOut}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </Box>
  );
};

export default AppNavBar;
