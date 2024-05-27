import { Layout } from "antd";
import Sidebar from "../SideBar/index";
import AppNavBar from "./header";
import { Outlet } from "react-router-dom";
const { Header, Content } = Layout;

const Topbar = ({ ...props }) => {
  return (
    <Layout>
      <Sidebar />
      <Layout>
        <Header
          style={{
            backgroundImage:
              "linear-gradient(to right,#f00538, #ff7f16,hsl(0, 0%, 100%),hsl(0, 0%, 100%))",
            height: 75,
          }}
        >
          <AppNavBar />
        </Header>
        <Content>
          <Outlet />
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Topbar;
