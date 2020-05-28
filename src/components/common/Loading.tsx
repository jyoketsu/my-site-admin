import React from "react";
import { Spin } from "antd";
export default function Loading() {
  return (
    <div
      className="loading-wrapper"
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.1)",
        zIndex: 999,
      }}
    >
      <Spin size="large" />
    </div>
  );
}
