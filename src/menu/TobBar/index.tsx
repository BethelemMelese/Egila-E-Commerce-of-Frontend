import { Layout, theme } from "antd";
import Sidebar from "../SideBar/index";
import { Outlet } from "react-router-dom";

const { Header, Content } = Layout;

const Topbar = ({ ...props }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Sidebar />
      <Layout>
        <Header style={{ background: colorBgContainer }}></Header>

        <Content style={{ margin: "0 16px" }}>
          <Outlet />
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Topbar;
