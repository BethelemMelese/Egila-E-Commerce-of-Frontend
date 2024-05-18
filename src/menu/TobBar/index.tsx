import { Layout, theme } from "antd";
import Sidebar from "../SideBar/index";
import { Outlet } from "react-router-dom";
import { useState } from "react";
const { Header, Content } = Layout;

const Topbar = ({ ...props }) => {
  return (
    <Layout>
      <Sidebar />
      <Layout>
        <Header
          style={{
            backgroundImage: "linear-gradient(to right, #ff7f16, #f00538)",
          }}
        ></Header>
        <Content
          style={{ margin: "0 16px", backgroundColor: "rgb(246, 241, 237)" }}
        >
          <Outlet />
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Topbar;
