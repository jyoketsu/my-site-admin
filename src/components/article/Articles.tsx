import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../store/reducer";
import api from "../../util/api";
import { GET_ARTICLES } from "../../store/types";
import { PageHeader, Table, Button, Space, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
const { confirm } = Modal;

export default function Articles() {
  const pageSize = 20;
  const history = useHistory();
  const [current, setCurrent] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    function getArticles(current: number, pageSize: number) {
      const payload = api.article.getArticles(current, pageSize);
      dispatch({ type: GET_ARTICLES, payload: payload });
    }
    getArticles(current, pageSize);
  }, [dispatch, current]);

  function deleteConfirm(record: any) {
    confirm({
      title: `确定要删除【${record.title}】吗？`,
      icon: <ExclamationCircleOutlined />,
      content: `删除【${record.title}】`,
      onOk() {},
    });
  }

  const columns = [
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "阅读量",
      dataIndex: "viewCount",
      key: "viewCount",
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
    },
    {
      title: "更新时间",
      dataIndex: "updateTime",
      key: "updateTime",
    },
    {
      title: "操作",
      key: "action",
      render: (text: string, record: any) => (
        <Space size="middle">
          <Button
            onClick={() =>
              history.push({
                pathname: "/home/article/edit",
                search: `?key=${record._id}`,
              })
            }
          >
            编辑
          </Button>
          <Button onClick={() => deleteConfirm(record)}>删除</Button>
        </Space>
      ),
    },
  ];

  const loading = useTypedSelector((state) => state.common.loading);
  const articles = useTypedSelector((state) => state.article.articles);
  const total = useTypedSelector((state) => state.article.total);
  return (
    <div>
      <PageHeader
        className="site-page-header"
        title="文章管理"
        subTitle="This is a subtitle"
        extra={[
          <Button
            key="add-article"
            type="primary"
            onClick={() => history.push("/home/article/edit")}
          >
            新建文章
          </Button>,
        ]}
      />
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 360 }}
      >
        <Table
          loading={loading}
          rowKey="_id"
          columns={columns}
          dataSource={articles}
          pagination={{
            current: current,
            total: total,
            pageSize: pageSize,
            showTotal: (total) => `共${total}篇文章`,
            onChange: (page) => {
              setCurrent(page);
              (document.getElementById(
                "layout-body"
              ) as HTMLElement).scrollTop = 0;
            },
          }}
        />
      </div>
    </div>
  );
}
