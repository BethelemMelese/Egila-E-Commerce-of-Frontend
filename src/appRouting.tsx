import { Route, Routes } from "react-router-dom";
import Login from "./component/Login";
import Register from "./component/Registration";
import Home from "./component/Home";
import Layout from "./menu/layout";
import MainPage from "./component/Frontpage/mainPage";
import NewArrival from "./component/Frontpage/newArrival";
import Category from "./component/Frontpage/category";
import NoPermission from "./component/NoPermission";
import Unauthorized from "./component/Unauthorized";
import Notification from "./commonComponent/notification";
import ViewItem from "./component/Item/View";
import ViewRole from "./component/Role/View";
import ViewItemCategory from "./component/ItemCategory/View";
import ViewCustomer from "./component/Customer/View";
import ViewSalesPerson from "./component/SalesPerson/View";
import ViewDeliveryPerson from "./component/DeliveryPerson/View";
import ViewAdmin from "./component/Admin/View";
import Missing from "./component/MissingPage/MissingPage";
import Setting from "./component/Setting";
import Report from "./component/Report";
import SampleExample from "./component/Sample";
import ChangePassword from "./component/Setting/changePassword";
import ViewCart from "./component/Cart";
import ViewOrder from "./component/Order/View";
import ViewFeadBack from "./component/FeadBack/View";
import Navmenu from "./component/Frontpage/mainLayout";
import "./css/style.css";
import "./css/mediaQuery.css";
import "./App.css";
import { AutoRout } from "./polices/AutoRoute";

const AppRoute = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="nav" element={<Navmenu />} />
        <Route path="newArrival" element={<NewArrival />} />
        <Route path="category" element={<Category />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="viewCart" element={<ViewCart />} />
        <Route path="sample" element={<SampleExample />} />
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

        <Route path="egila" element={<AutoRout component={Layout} />}>
          <Route path="home" element={<Home />} />
          <Route path="viewItem" element={<ViewItem />} />
          <Route path="ViewRole" element={<ViewRole />} />
          <Route path="viewCategory" element={<ViewItemCategory />} />
          <Route path="viewCustomer" element={<ViewCustomer />} />
          <Route path="ViewAdmin" element={<ViewAdmin />} />
          <Route path="viewSalesPerson" element={<ViewSalesPerson />} />
          <Route path="ViewOrder" element={<ViewOrder />} />
          <Route path="info" element={<Setting />} />
          <Route path="report" element={<Report />} />
          <Route path="changePassword" element={<ChangePassword />} />
          <Route path="viewDeliveryPerson" element={<ViewDeliveryPerson />} />
          <Route path="viewComment" element={<ViewFeadBack />} />
        </Route>
      </Routes>
    </div>
  );
};

export default AppRoute;
