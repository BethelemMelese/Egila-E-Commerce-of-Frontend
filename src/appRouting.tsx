import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./component/Login";
import Register from "./component/Registration";
import Home from "./component/Home";
import Topbar from "./menu/TobBarMenu";
import Sidebar from "./menu/SideBarMenu";
import Layout from "./menu/layout";
import MainPage from "./component/Frontpage/mainPage";
import './css/style.css';
// import './css/style.scss';
import './App.css';

const AppRoute = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="topBar" element={<Topbar />} />
        <Route path="sideBar" element={<Sidebar isOpen={false} setIsOpen={function (value: React.SetStateAction<boolean>): void {
          throw new Error("Function not implemented.");
        } } />} />
        <Route path="mainPage" element={<MainPage/>} />

      </Routes>
    </div>
  );
};

export default AppRoute;
