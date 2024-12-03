import Sidebar from "../SideBar/index";
import AppNavBar from "./header";
import { Outlet } from "react-router-dom";
import { useState } from "react";
const Topbar = ({ ...props }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <AppNavBar toggleSidebar={toggleSidebar} />
      <div style={{ display: "flex" }}>
        {isSidebarOpen && <Sidebar />}
        <main className="container">
          <Outlet />
          {props.children}
        </main>
      </div>
    </div>
  );
};

export default Topbar;
