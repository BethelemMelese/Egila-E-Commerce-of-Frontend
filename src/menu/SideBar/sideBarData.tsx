import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link, Outlet } from "react-router-dom";
import IconDashboard from "@mui/icons-material/Dashboard";
import ReportIcon from "@mui/icons-material/Report";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PeopleIcon from "@mui/icons-material/People";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
import CategoryIcon from "@mui/icons-material/Category";
import SettingsIcon from "@mui/icons-material/Settings";
import CommentIcon from "@mui/icons-material/Comment";
import ControlCameraIcon from '@mui/icons-material/ControlCamera';
import ExtensionIcon from '@mui/icons-material/Extension';
import AppShortcutIcon from '@mui/icons-material/AppShortcut';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarCheck = () => {
  // const [visibleMenus, setVisibleMenus] = React.useState<any[]>([]);
  // let foundRole: any;
  // const userRole = localStorage.getItem("user");
  // const data: any = userRole != null ? JSON.parse(userRole) : undefined;

  // React.useEffect(() => {
  //   if (foundRole) setVisibleMenus(foundRole.menu);
  // }, [foundRole]);

  return (
    <div>
      <ListItem button component={Link} to="#" className="menuItem">
        <ListItemIcon className="menuItemIcon">
          <IconDashboard />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem button component={Link} to="#" className="menuItem">
        <ListItemIcon className="menuItemIcon">
          <ControlCameraIcon />
        </ListItemIcon>
        <ListItemText primary="Role" />
      </ListItem>
      <ListItem button component={Link} to="#" className="menuItem">
        <ListItemIcon className="menuItemIcon">
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Customer" />
      </ListItem>
      <ListItem button component={Link} to="#" className="menuItem">
        <ListItemIcon className="menuItemIcon">
          <LocalPoliceIcon />
        </ListItemIcon>
        <ListItemText primary="Admin" />
      </ListItem>
      <ListItem button component={Link} to="#" className="menuItem">
        <ListItemIcon className="menuItemIcon">
          <ReceiptIcon />
        </ListItemIcon>
        <ListItemText primary="Sales Person" />
      </ListItem>
      <ListItem button component={Link} to="#" className="menuItem">
        <ListItemIcon className="menuItemIcon">
          <DeliveryDiningIcon />
        </ListItemIcon>
        <ListItemText primary="Deliveries" />
      </ListItem>
      <ListItem button component={Link} to="#" className="menuItem">
        <ListItemIcon className="menuItemIcon">
          <ExtensionIcon />
        </ListItemIcon>
        <ListItemText primary="Item" />
      </ListItem>
      <ListItem button component={Link} to="#" className="menuItem">
        <ListItemIcon className="menuItemIcon">
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary="Category" />
      </ListItem>
      <ListItem button component={Link} to="#" className="menuItem">
        <ListItemIcon className="menuItemIcon">
          <AppShortcutIcon />
        </ListItemIcon>
        <ListItemText primary="Order" />
      </ListItem>
      <ListItem button component={Link} to="#" className="menuItem">
        <ListItemIcon className="menuItemIcon">
          <CommentIcon />
        </ListItemIcon>
        <ListItemText primary="Comment" />
      </ListItem>
      <ListItem button component={Link} to="#" className="menuItem">
        <ListItemIcon className="menuItemIcon">
          <ReportIcon />
        </ListItemIcon>
        <ListItemText primary="Report" />
      </ListItem>
      <ListItem button component={Link} to="#" className="menuItem">
        <ListItemIcon className="menuItemIcon">
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Setting" />
      </ListItem>
    </div>
  );
};

export default SidebarCheck;
