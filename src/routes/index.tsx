import React from "react";
import { Spin } from "antd";
import Loadable from "react-loadable";
import {
  HomeOutlined,
  FileWordOutlined,
  UserOutlined,
} from "@ant-design/icons";

let config = [
  {
    name: "首页",
    path: "/home",
    exact: true,
    isMenu: true,
    component: Loadable({
      loader: () => import("../components/dashboard/Dashboard"),
      loading: () => <Spin />,
    }),
    icon: <HomeOutlined />,
  },
  {
    name: "文章管理",
    path: "/home/article",
    exact: false,
    isMenu: true,
    component: Loadable({
      loader: () => import("../components/article/Articles"),
      loading: () => <Spin />,
    }),
    icon: <FileWordOutlined />,
  },
  {
    name: "用户管理",
    path: "/home/user",
    exact: false,
    isMenu: true,
    component: Loadable({
      loader: () => import("../components/user/User"),
      loading: () => <Spin />,
    }),
    icon: <UserOutlined />,
  },
];

export default config;
