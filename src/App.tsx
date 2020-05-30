import React, { useState } from "react";
import "./App.less";
import routers from "./routes/index";
import Routes from "./routes/Routes";
import { Link, useLocation } from "react-router-dom";
import { Layout, Menu, Avatar } from "antd";
import DocumentTitle from "react-document-title";
const { Header, Content, Sider } = Layout;

function App() {
  let location = useLocation();
  const [title, setTitle] = useState(routers[0].name);

  function selectedKey(routers: any) {
    for (let index = 0; index < routers.length; index++) {
      const element = routers[index];
      if (element.path.includes(location.pathname)) {
        return index;
      }
    }
  }

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
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[`${selectedKey(routers)}`]}
          >
            {routers.map((router, index) => (
              <Menu.Item key={index} icon={router.icon}>
                <Link to={router.path} onClick={() => setTitle(router.name)}>
                  {router.name}
                </Link>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout id="layout-body">
          <Header className="site-layout-sub-header-background admin-head">
            <div className="admin-head-left"></div>
            <div className="admin-head-right">
              <Avatar>U</Avatar>
            </div>
          </Header>
          <Content
            style={{
              margin: "24px 16px 0",
              minHeight: "unset",
              position: "relative",
            }}
          >
            <Routes />
          </Content>
        </Layout>
      </Layout>
    </DocumentTitle>
  );
}

export default App;
