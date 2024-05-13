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
import ControlCameraIcon from "@mui/icons-material/ControlCamera";
import ExtensionIcon from "@mui/icons-material/Extension";
import AppShortcutIcon from "@mui/icons-material/AppShortcut";
import Images from "../../Images/Logo 6.png";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const [visibleMenus, setVisibleMenus] = React.useState<any[]>([]);
  let foundRole: any;
  const userRole = localStorage.getItem("user");
  const data: any = userRole != null ? JSON.parse(userRole) : undefined;

  React.useEffect(() => {
    if (foundRole) setVisibleMenus(foundRole.menu);
  }, [foundRole]);

  return (
    <>
      <div className="wrapper">
        <div className="sidebar">
          <div className="profile">
            <img src={Images} alt="profile_picture" />
          </div>

          <ul>
            <li>
              <a href="#" className="active">
                <span className="icon">
                  <IconDashboard />
                </span>
                <span className="item">Home</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span className="icon">
                  <ControlCameraIcon />
                </span>
                <span className="item">Role</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span className="icon">
                  <PeopleIcon />
                </span>
                <span className="item">Customer</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span className="icon">
                  <LocalPoliceIcon />
                </span>
                <span className="item">Admin</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span className="icon">
                  <ReceiptIcon />
                </span>
                <span className="item">Sales Person</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span className="icon">
                  <DeliveryDiningIcon />
                </span>
                <span className="item">Deliveries</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span className="icon">
                  <ExtensionIcon />
                </span>
                <span className="item">Item</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span className="icon">
                  <CategoryIcon />
                </span>
                <span className="item">Category</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span className="icon">
                  <AppShortcutIcon />
                </span>
                <span className="item">Order</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span className="icon">
                  <CommentIcon />
                </span>
                <span className="item">Comment</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span className="icon">
                  <ReportIcon />
                </span>
                <span className="item">Report</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span className="icon">
                  <SettingsIcon />
                </span>
                <span className="item">Setting</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
