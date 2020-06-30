import React from "react";
import { Layout } from "antd";
const { Footer } = Layout;
export default function Dashboard() {
  return (
    <div>
      主面板
      <Footer style={{ textAlign: "center", padding: "15px 50px" }}>
        Site Admin ©2020&nbsp;&nbsp;
        <span
          onClick={() => window.open("http://www.beian.miit.gov.cn", "_blank")}
        >
          苏ICP备20038833号
        </span>
        &nbsp;&nbsp; Created by Ketsu Jyo
      </Footer>
    </div>
  );
}
