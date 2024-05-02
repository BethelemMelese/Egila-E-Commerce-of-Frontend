import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./component/Login";
import Register from "./component/Registration";
import Home from "./component/Home";
import TobBar from "./menu/TobBarMenu";
import SideBar from "./menu/SideBarMenu";
import './css/style.css';
// import './css/style.scss';
import './App.css';

const AppRoute = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="topBar" element={<TobBar />} />
        <Route path="sideBar" element={<SideBar />} />
      </Routes>
    </div>
  );
};

export default AppRoute;
