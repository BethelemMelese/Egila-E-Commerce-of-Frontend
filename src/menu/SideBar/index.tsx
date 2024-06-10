import React, { useState } from "react";
import ReportIcon from "@mui/icons-material/Report";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PeopleIcon from "@mui/icons-material/People";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
import CategoryIcon from "@mui/icons-material/Category";
import CommentIcon from "@mui/icons-material/Comment";
import ControlCameraIcon from "@mui/icons-material/ControlCamera";
import ExtensionIcon from "@mui/icons-material/Extension";
import AppShortcutIcon from "@mui/icons-material/AppShortcut";
import GridViewIcon from "@mui/icons-material/GridView";
import Images from "../../Images/Logo 4.png";
import { Link, NavLink } from "react-router-dom";
import { Divider, Paper } from "@mui/material";
import { userService } from "../../polices/userService";

const Sidebar: React.FC = () => {
  const items: any = [
    {
      key: "1",
      icon: <GridViewIcon />,
      label: "Dashboard",
      path: "/egila/home",
      cName: "nav-text",
      nActive: "active",
    },
    {
      key: "2",
      icon: <ControlCameraIcon />,
      label: "Role",
      path: "/egila/ViewRole",
      cName: "nav-text",
      nActive: "active",
    },
    {
      key: "3",
      icon: <PeopleIcon />,
      label: "Customer",
      path: "/egila/ViewCustomer",
      cName: "nav-text",
      nActive: "active",
    },
    {
      key: "4",
      icon: <LocalPoliceIcon />,
      label: "Admin",
      path: "/egila/ViewAdmin",
      cName: "nav-text",
      nActive: "active",
    },
    {
      key: "5",
      icon: <ReceiptIcon />,
      label: "Sales Person",
      path: "/egila/viewSalesPerson",
      cName: "nav-text",
      nActive: "active",
    },
    {
      key: "6",
      icon: <DeliveryDiningIcon />,
      label: "Deliveries",
      path: "/egila/ViewDeliveries",
      cName: "nav-text",
      nActive: "active",
    },
    {
      key: "7",
      icon: <ExtensionIcon />,
      label: "Item",
      path: "/egila/viewItem",
      cName: "nav-text",
      nActive: "active",
    },
    {
      key: "8",
      icon: <CategoryIcon />,
      label: "Category",
      path: "/egila/viewCategory",
      cName: "nav-text",
      nActive: "active",
    },
    {
      key: "9",
      icon: <AppShortcutIcon />,
      label: "Order",
      path: "/egila/ViewOrder",
      cName: "nav-text",
      nActive: "active",
    },
    {
      key: "10",
      icon: <CommentIcon />,
      label: "Comment",
      path: "/egila/ViewComment",
      cName: "nav-text",
      nActive: "active",
    },
    {
      key: "11",
      icon: <ReportIcon />,
      label: "Report",
      path: "/egila/Report",
      cName: "nav-text",
      nActive: "active",
    },
  ];
  return (
    <div
      style={{
        backgroundColor: "#fff",
        position: "fixed",
        width: 220,
      }}
    >
      <Paper elevation={2}>
        <img alt="Egila" src={Images} className="profile" />
        <Divider
          style={{
            color: "#f00538",
            height: 10,
          }}
        ></Divider>
        <nav className="nav-menu">
          <ul className="nav-menu-items">
            {items.map((item: any, index: any) => {
              return (
                userService.userController.match(item.label) && (
                  <>
                    <li key={index} className={item.cName}>
                      <NavLink
                        to={item.path}
                        className={item.nActive == "active" ? "active" : ""}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </NavLink>
                    </li>
                  </>
                )
              );
            })}
          </ul>
        </nav>
      </Paper>
    </div>
  );
};

export default Sidebar;
