import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./component/Login";
import Register from "./component/Registration";
import Home from "./component/Home";
import Topbar from "./menu/TobBar";
import Layout from "./menu/layout";
import MainPage from "./component/Frontpage/mainPage";
import NoPermission from "./component/NoPermission";
import Unauthorized from "./component/Unauthorized";
import Notification from "./commonComponent/notification";
import ViewItem from "./component/Item/View";
import ViewRole from "./component/Role/View";
import ViewItemCategory from "./component/ItemCategory/View";
import ViewCustomer from "./component/Customer/View";
import ViewSalesPerson from "./component/SalesPerson/View";
import Missing from "./component/MissingPage/MissingPage";
import Setting from "./component/Setting";
import "./css/style.css";
import "./css/mediaQuery.css";
import "./App.css";
import { AutoRout } from "./component/polices/AutoRoute";


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
        <Route path="NoPermission" element={<NoPermission />} />
        <Route path="Unauthorized" element={<Unauthorized />} />
        <Route path="/*" element={<Missing />} />
        <Route path="topBar" element={<Topbar />} />

        <Route path="egila" element={<AutoRout component={Layout} />}>
          <Route path="home" element={<Home />} />
          <Route path="viewItem" element={<ViewItem />} />
          <Route path="ViewRole" element={<ViewRole />} />
          <Route path="viewCategory" element={<ViewItemCategory />} />
          <Route path="viewCustomer" element={<ViewCustomer />} />
          <Route path="viewSalesPerson" element={<ViewSalesPerson />} />
          <Route path="setting" element={<Setting/>}/>
        </Route>
      </Routes>
    </div>
  );
};

export default AppRoute;
