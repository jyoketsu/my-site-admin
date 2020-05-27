import React, { useState } from "react";
import "./App.css";
import routers from "./routes/index";
import Routes from "./routes/Routes";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import DocumentTitle from "react-document-title";
const { Header, Content, Footer, Sider } = Layout;

function App() {
  const [title, setTitle] = useState(routers[0].name);
  return (
    <DocumentTitle title={title}>
      <Layout style={{ width: "100%", height: "100%" }}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="layout-logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["0"]}>
            {routers.map((router, index) =>
              router.isMenu ? (
                <Menu.Item key={index} icon={router.icon}>
                  <Link to={router.path} onClick={() => setTitle(router.name)}>
                    {router.name}
                  </Link>
                </Menu.Item>
              ) : null
            )}
          </Menu>
        </Sider>
        <Layout>
          <Header
            className="site-layout-sub-header-background"
            style={{ padding: 0 }}
          ></Header>
          <Content style={{ margin: "24px 16px 0" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <Routes />
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </DocumentTitle>
  );
}

export default App;
