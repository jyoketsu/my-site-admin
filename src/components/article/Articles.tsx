import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../redux/reducer/RootState";
import { getArticles, deleteArticle } from "../../redux/actions/articleActions";
import { PageHeader, Table, Button, Space, Modal, Tag } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import moment from "moment";
const { confirm } = Modal;

export default function Articles() {
  const pageSize = 20;
  const history = useHistory();
  const [current, setCurrent] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArticles(current, pageSize));
  }, [dispatch, current]);

  function deleteConfirm(record: any) {
    confirm({
      title: `确定要删除【${record.title}】吗？`,
      icon: <ExclamationCircleOutlined />,
      content: `删除【${record.title}】`,
      onOk() {
        dispatch(deleteArticle(record._id));
      },
    });
  }

  const columns = [
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "类别",
      dataIndex: "category",
      key: "category",
      width: 120,
      render: (value: any) => (value ? value.name : ""),
    },
    {
      title: "标签",
      dataIndex: "tags",
      key: "tags",
      render: (tags: any) =>
        tags
          ? tags.map((tag: any, index: number) => (
              <Tag key={index} color={tag.color}>
                {tag.name}
              </Tag>
            ))
          : null,
    },
    {
      title: "阅读量",
      dataIndex: "viewCount",
      key: "viewCount",
      width: 80,
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
      width: 150,
      render: (value: string) => moment(value).format("YYYY年MM月DD日"),
    },
    {
      title: "更新时间",
      dataIndex: "updateTime",
      key: "updateTime",
      width: 150,
      render: (value: string) => moment(value).format("YYYY年MM月DD日"),
    },
    {
      title: "操作",
      key: "action",
      render: (text: string, record: any) => (
        <Space size="middle">
          <Button onClick={() => history.push(`/home/article/${record._id}`)}>
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
        extra={[
          <Button
            key="add-article"
            type="primary"
            onClick={() => history.push("/home/article/new")}
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
