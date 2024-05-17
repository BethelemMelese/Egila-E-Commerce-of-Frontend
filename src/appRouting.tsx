import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./component/Login";
import Register from "./component/Registration";
import Home from "./component/Home";
import Topbar from "./menu/TobBar";
import Layout from "./menu/layout";
import MainPage from "./component/Frontpage/mainPage";
import Notification from "./commonComponent/notification";
// import {AutoRout} from "./component/polices/AutoRoute";
import ViewItem from "./component/Item/View";
import "./css/style.css";
// import './css/style.scss';
import "./App.css";

const AppRoute = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route
          path="Notification"
          element={
            <Notification
              data={{
                message: undefined,
                description: undefined,
                icon: undefined,
              }}
            />
          }
        />
        <Route
          path="egila"
          // element={<AutoRout component={Layout} />}
          element={<Layout />}
        >
          <Route path="topBar" element={<Topbar />} />
          <Route path="home" element={<Home />} />
          <Route path="viewItem" element={<ViewItem />} />
        </Route>
      </Routes>
    </div>
  );
};

export default AppRoute;
