import React from "react";
import Loading from "../components/common/Loading";
import Loadable from "react-loadable";
import {
  HomeOutlined,
  FileWordOutlined,
  UserOutlined,
  TagOutlined,
  BookOutlined,
} from "@ant-design/icons";

let config = [
  {
    name: "首页",
    path: "/home",
    exact: true,
    component: Loadable({
      loader: () => import("../components/dashboard/Dashboard"),
      loading: () => <Loading />,
    }),
    icon: <HomeOutlined />,
  },
  {
    name: "文章管理",
    path: "/home/article",
    exact: false,
    component: Loadable({
      loader: () => import("../components/article/Index"),
      loading: () => <Loading />,
    }),
    icon: <FileWordOutlined />,
  },
  {
    name: "类别管理",
    path: "/home/category",
    exact: false,
    component: Loadable({
      loader: () => import("../components/category/Category"),
      loading: () => <Loading />,
    }),
    icon: <BookOutlined />,
  },
  {
    name: "标签管理",
    path: "/home/tag",
    exact: false,
    component: Loadable({
      loader: () => import("../components/tag/Tag"),
      loading: () => <Loading />,
    }),
    icon: <TagOutlined />,
  },
  {
    name: "用户管理",
    path: "/home/user",
    exact: false,
    component: Loadable({
      loader: () => import("../components/user/User"),
      loading: () => <Loading />,
    }),
    icon: <UserOutlined />,
  },
];

export default config;
