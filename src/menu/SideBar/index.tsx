import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { userService } from "../../polices/userService";

type SidebarItem = {
  id: number;
  label: string;
  icon: React.ReactNode;
  route: string;
};

const Sidebar: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>("");
  const navigate = useNavigate();

  useEffect(()=>{
    setActiveItem(activeItem)
  },[activeItem])

  const items: SidebarItem[] = [
    {
      id: 1,
      icon: <GridViewIcon />,
      label: "Dashboard",
      route: "/egila/home",
    },
    {
      id: 2,
      icon: <ControlCameraIcon />,
      label: "Role",
      route: "/egila/ViewRole",
    },
    {
      id: 3,
      icon: <PeopleIcon />,
      label: "Customer",
      route: "/egila/ViewCustomer",
    },
    {
      id: 4,
      icon: <LocalPoliceIcon />,
      label: "Admin",
      route: "/egila/ViewAdmin",
    },
    {
      id: 5,
      icon: <ReceiptIcon />,
      label: "Sales Person",
      route: "/egila/viewSalesPerson",
    },
    {
      id: 6,
      icon: <DeliveryDiningIcon />,
      label: "Delivery Person",
      route: "/egila/viewDeliveryPerson",
    },
    {
      id: 7,
      icon: <ExtensionIcon />,
      label: "Item",
      route: "/egila/viewItem",
    },
    {
      id: 8,
      icon: <CategoryIcon />,
      label: "Category",
      route: "/egila/viewCategory",
    },
    {
      id: 9,
      icon: <AppShortcutIcon />,
      label: "Order",
      route: "/egila/viewOrder",
    },
    {
      id: 10,
      icon: <ReportIcon />,
      label: "Report",
      route: "/egila/Report",
    },
    {
      id: 11,
      icon: <CommentIcon />,
      label: "Comment",
      route: "/egila/viewComment",
    },
    {
      id: 12,
      icon: <CommentIcon />,
      label: "Contacts",
      route: "/egila/viewContact",
    },
  ];

  const handleItemClick = (route: string) => {
    setActiveItem(route);
    navigate(route);
  };

  return (
    <nav className="sidebar">
      <ul className="sidebar-list">
        {items.map(
          (item) =>
            userService.userController.match(item.label) && (
              <>
                <li
                  key={item.id}
                  className={`sidebar-item ${
                    activeItem === item.route ? "active" : ""
                  }`}
                  onClick={() => handleItemClick(item.route)}
                >
                  <div className="icon">{item.icon}</div>
                  <span className="label">{item.label}</span>
                </li>
              </>
            )
        )}
      </ul>
    </nav>
  );
};

export default Sidebar;
