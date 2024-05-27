import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Images from "../../Images/ProfilePhoto.jpg";
import { Avatar, Divider } from "@mui/material";

const AppNavBar = () => {
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
            <Badge
              badgeContent="Bethisha"
              color="warning"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              <Avatar src={Images} sx={{ width: 50, height: 50 }}></Avatar>
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </Box>
  );
};

export default AppNavBar;
