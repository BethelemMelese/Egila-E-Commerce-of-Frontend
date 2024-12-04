import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import {
  Avatar,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { userService } from "../../polices/userService";
import { useState, useEffect } from "react";
import axios from "axios";
import { appUrl } from "../../appurl";
import React from "react";
import { useNavigate } from "react-router-dom";
import SyncLockIcon from "@mui/icons-material/SyncLock";
import LogoutIcon from "@mui/icons-material/Logout";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import logo from "../../Images/Logo 7.png";

interface TopbarProps {
  toggleSidebar: () => void;
}

const AppNavBar: React.FC<TopbarProps> = ({ toggleSidebar }) => {
  const [userInfo, setUserInfo] = useState<any>();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorE2, setAnchorE2] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
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
      .create({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .get(appUrl + `users/UserInfo/${localStorage.getItem("token")}`)
      .then((response: any) => onFetchSuccess(response.data))
      .catch((error: any) => onFetchError(error));
  }, []);

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("permission");
    localStorage.removeItem("role");
    localStorage.removeItem("controller");
    navigate("/login");
  };

  return (
    <header className="topbar">
      <div className="logo">
        <img src={logo} width={300} height={100} />
      </div>

      <div className="pp-setting">
        <div className="current_role">
          <Typography sx={{ p: 1, fontFamily: "Gill Sans" }}>
            As a: {userService.currentRole}
          </Typography>
        </div>
        <div>
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
                    {userInfo.profileImage != undefined && (
                      <Avatar
                        src={appUrl + `users/uploads/${userInfo.profileImage}`}
                        sx={{ width: 50, height: 50 }}
                      ></Avatar>
                    )}
                    {userInfo.profileImage == undefined && (
                      <Avatar sx={{ width: 50, height: 50 }}></Avatar>
                    )}
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
            <MenuItem onClick={() => navigate("/egila/info")}>
              <ListItemIcon>
                <PermIdentityIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Profile</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => navigate("/egila/changePassword")}>
              <ListItemIcon>
                <SyncLockIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Change Password</ListItemText>
            </MenuItem>
            <MenuItem onClick={logOut}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
          </Menu>
        </div>
      </div>
    </header>
  );
};

export default AppNavBar;
