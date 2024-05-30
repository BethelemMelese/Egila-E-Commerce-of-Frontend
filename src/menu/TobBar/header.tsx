import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Images from "../../Images/ProfilePhoto.jpg";
import { Avatar, Divider } from "@mui/material";
import { userService } from "../../component/polices/userService";
import { useState, useEffect } from "react";
import axios from "axios";
import { appUrl } from "../../appurl";

const AppNavBar = () => {
  const token = userService.token;
  const [userInfo, setUserInfo] = useState<any>();
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

          <IconButton sx={{ p: 1 }}>
            <Divider />
            {userInfo != undefined && (
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
            )}
          </IconButton>
        </Box>
      </Toolbar>
    </Box>
  );
};

export default AppNavBar;
