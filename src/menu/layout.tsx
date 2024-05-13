import React, { useState } from "react";
import Sidebar from "./SideBarMenu/index";
import Home from "../component/Home";
import MainPage from "../component/Frontpage/mainPage";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div>
      <button onClick={toggleSidebar}>Toggle Sidebar</button>
      {isSidebarOpen && <Sidebar isOpen={false} setIsOpen={function (value: React.SetStateAction<boolean>): void {
        throw new Error("Function not implemented.");
      } } />}
      <Home />
    </div>
  );
};

export default Layout;
