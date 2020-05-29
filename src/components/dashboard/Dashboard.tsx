import React from "react";
import { Layout } from "antd";
const { Footer } = Layout;
export default function Dashboard() {
  return (
    <div>
      主面板
      <Footer style={{ textAlign: "center", padding: "15px 50px" }}>
        Site Admin ©2020 Created by Ketsu Jyo
      </Footer>
    </div>
  );
}
