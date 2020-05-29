import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../store/reducer";
import api from "../../util/api";
import {
  GET_CATEGORIES,
  ADD_CATEGORY,
  EDIT_CATEGORY,
  DELETE_CATEGORY,
} from "../../store/types";
import { PageHeader, Table, Button, Space, Modal, Form, Input } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import moment from "moment";
const { confirm } = Modal;

export default function Category() {
  const [modalVisible, setModalVisible] = useState(false);
  interface FieldData {
    name: string[];
    value: any;
  }
  const [fields, setFields] = useState<FieldData[]>([
    { name: ["_id"], value: undefined },
    { name: ["name"], value: undefined },
  ]);
  const dispatch = useDispatch();

  useEffect(() => {
    function getCategories() {
      const payload = api.category.getCategories();
      dispatch({ type: GET_CATEGORIES, payload: payload });
    }
    getCategories();
  }, [dispatch]);

  function deleteConfirm(record: any) {
    confirm({
      title: `确定要删除【${record.name}】吗？`,
      icon: <ExclamationCircleOutlined />,
      content: `删除【${record.name}】`,
      onOk() {
        const payload = api.category.deleteCategory(record._id);
        dispatch({ type: DELETE_CATEGORY, _id: record._id, payload: payload });
      },
    });
  }

  function createCategory() {
    form
      .validateFields()
      .then((values) => {
        const _id = form.getFieldValue("_id");
        const name = form.getFieldValue("name");
        if (_id) {
          const payload = api.category.editCategory(_id, name);
          dispatch({
            type: EDIT_CATEGORY,
            _id: _id,
            name: name,
            payload: payload,
          });
        } else {
          const payload = api.category.createCategory(name);
          dispatch({ type: ADD_CATEGORY, payload: payload });
        }
        setModalVisible(false);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  }

  const columns = [
    {
      title: "分类名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "文章数",
      dataIndex: "count",
      key: "count",
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
      render: (value: string) => moment(value).format("YYYY年MM月DD日"),
    },
    {
      title: "更新时间",
      dataIndex: "updateTime",
      key: "updateTime",
      render: (value: string) => moment(value).format("YYYY年MM月DD日"),
    },
    {
      title: "操作",
      key: "action",
      render: (text: string, record: any) => (
        <Space size="middle">
          <Button
            onClick={() => {
              setFields([
                { name: ["_id"], value: record._id },
                { name: ["name"], value: record.name },
              ]);
              setModalVisible(true);
            }}
          >
            编辑
          </Button>
          <Button onClick={() => deleteConfirm(record)}>删除</Button>
        </Space>
      ),
    },
  ];

  const loading = useTypedSelector((state) => state.common.loading);
  const categories = useTypedSelector((state) => state.category.categories);
  const [form] = Form.useForm();
  return (
    <div>
      <PageHeader
        className="site-page-header"
        title="类别管理"
        subTitle="This is a subname"
        extra={[
          <Button
            key="add-article"
            type="primary"
            onClick={() => {
              setFields([
                { name: ["_id"], value: undefined },
                { name: ["name"], value: undefined },
              ]);
              setModalVisible(true);
            }}
          >
            新建分类
          </Button>,
        ]}
      />
      <div className="site-layout-background" style={{ padding: 24 }}>
        <Table
          loading={loading}
          rowKey="_id"
          columns={columns}
          dataSource={categories}
        />
      </div>
      <Modal
        title={`${fields[0].value ? "编辑" : "新增"}类别`}
        visible={modalVisible}
        onOk={() => createCategory()}
        onCancel={() => setModalVisible(false)}
        okText="提交"
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          fields={fields}
        >
          <Form.Item
            name="name"
            label="类别名"
            rules={[
              {
                required: true,
                message: "请输入类别名！",
              },
            ]}
          >
            <Input placeholder="请输入类别名" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
