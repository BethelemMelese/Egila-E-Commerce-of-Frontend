import React, { useState } from "react";
import { Layout, Menu } from "antd";
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
import Images from "../../Images/Logo 4.png";
import { Link } from "react-router-dom";
import { Divider } from "@mui/material";

const { Header, Sider, Content } = Layout;

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const items: any = [
    {
      key: "1",
      icon: <IconDashboard />,
      label: "Home",
      path: "/egila/home",
      cName: "nav-text",
    },
    {
      key: "2",
      icon: <ControlCameraIcon />,
      label: "Role",
      path: "/egila/#",
      cName: "nav-text",
    },
    {
      key: "3",
      icon: <PeopleIcon />,
      label: "Customer",
      path: "/egila/#",
      cName: "nav-text",
    },
    {
      key: "4",
      icon: <LocalPoliceIcon />,
      label: "Admin",
      path: "/egila/#",
      cName: "nav-text",
    },
    {
      key: "5",
      icon: <ReceiptIcon />,
      label: "Sales Person",
      path: "/egila/#",
      cName: "nav-text",
    },
    {
      key: "6",
      icon: <DeliveryDiningIcon />,
      label: "Deliveries",
      path: "/egila/#",
      cName: "nav-text",
    },
    {
      key: "7",
      icon: <ExtensionIcon />,
      label: "Item",
      path: "/egila/#",
      cName: "nav-text",
    },
    {
      key: "8",
      icon: <CategoryIcon />,
      label: "Category",
      path: "/egila/#",
      cName: "nav-text",
    },
    {
      key: "9",
      icon: <AppShortcutIcon />,
      label: "Order",
      path: "/egila/#",
      cName: "nav-text",
    },
    {
      key: "10",
      icon: <CommentIcon />,
      label: "Comment",
      path: "/egila/#",
      cName: "nav-text",
    },
    {
      key: "11",
      icon: <ReportIcon />,
      label: "Report",
      path: "/egila/#",
      cName: "nav-text",
    },
    {
      key: "12",
      icon: <SettingsIcon />,
      label: "Setting",
      path: "/egila/#",
      cName: "nav-text",
    },
  ];
  return (
    <>
      <div
        style={{
          backgroundColor: "#fff",
          position: "fixed",
          // left: 0,
          // top: 0,
          // bottom: 0,
          // minWidth: 240,
          width: 220,
        }}
      >
        <img alt="Egila" src={Images} className="profile" />
        <Divider
          style={{
            color:"#f00538",
            height:10
          }}
        ></Divider>
        <nav className="nav-menu">
          <ul className="nav-menu-items">
            {items.map((item: any, index: any) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
