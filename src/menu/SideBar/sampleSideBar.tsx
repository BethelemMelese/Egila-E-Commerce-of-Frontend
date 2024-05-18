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
import Images from "../../Images/Logo 6.png";
import { Link } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const items: any = [
    {
      key: "1",
      icon: <IconDashboard />,
      label: "Home",
      path: "/egila/home",
    },
    {
      key: "2",
      icon: <ControlCameraIcon />,
      label: "Role",
      path: "/egila/#",
    },
    {
      key: "3",
      icon: <PeopleIcon />,
      label: "Customer",
      path: "/egila/#",
    },
    {
      key: "4",
      icon: <LocalPoliceIcon />,
      label: "Admin",
      path: "/egila/#",
    },
    {
      key: "5",
      icon: <ReceiptIcon />,
      label: "Sales Person",
      path: "/egila/#",
    },
    {
      key: "6",
      icon: <DeliveryDiningIcon />,
      label: "Deliveries",
      path: "/egila/#",
    },
    {
      key: "7",
      icon: <ExtensionIcon />,
      label: "Item",
      path: "/egila/#",
    },
    {
      key: "8",
      icon: <CategoryIcon />,
      label: "Category",
      path: "/egila/#",
    },
    {
      key: "9",
      icon: <AppShortcutIcon />,
      label: "Order",
      path: "/egila/#",
    },
    {
      key: "10",
      icon: <CommentIcon />,
      label: "Comment",
      path: "/egila/#",
    },
    {
      key: "11",
      icon: <ReportIcon />,
      label: "Report",
      path: "/egila/#",
    },
    {
      key: "12",
      icon: <SettingsIcon />,
      label: "Setting",
      path: "/egila/#",
    },
  ];
  return (
    <>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          backgroundColor: "#fff",
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          minWidth: 242,
        }}
      >
        <img alt="Egila" src={Images} className="top-image" />
        <Menu
          style={{
            backgroundColor: "#fff",
            fontFamily: "inherit",
            fontSize: 15,
            color: "#fff",
          }}
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <IconDashboard />,
              label: "Home",
            },
            {
              key: "2",
              icon: <ControlCameraIcon />,
              label: "Role",
            },
            {
              key: "3",
              icon: <PeopleIcon />,
              label: "Customer",
            },
            {
              key: "4",
              icon: <LocalPoliceIcon />,
              label: "Admin",
            },
            {
              key: "5",
              icon: <ReceiptIcon />,
              label: "Sales Person",
            },
            {
              key: "6",
              icon: <DeliveryDiningIcon />,
              label: "Deliveries",
            },
            {
              key: "7",
              icon: <ExtensionIcon />,
              label: "Item",
            },
            {
              key: "8",
              icon: <CategoryIcon />,
              label: "Category",
            },
            {
              key: "9",
              icon: <AppShortcutIcon />,
              label: "Order",
            },
            {
              key: "10",
              icon: <CommentIcon />,
              label: "Comment",
            },
            {
              key: "11",
              icon: <ReportIcon />,
              label: "Report",
            },
            {
              key: "12",
              icon: <SettingsIcon />,
              label: "Setting",
            },
          ]}
        />
      </Sider>
    </>
  );
};

export default Sidebar;
