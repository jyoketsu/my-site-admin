import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../store/reducer";
import api from "../../util/api";
import { GET_TAGS, ADD_TAG, EDIT_TAG, DELETE_TAG } from "../../store/types";
import {
  PageHeader,
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Tag,
  Select,
} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import moment from "moment";
const { Option } = Select;
const { confirm } = Modal;

export default function TagManage() {
  const [modalVisible, setModalVisible] = useState(false);
  interface FieldData {
    name: string[];
    value: any;
  }
  const [fields, setFields] = useState<FieldData[]>([
    { name: ["_id"], value: undefined },
    { name: ["name"], value: undefined },
    { name: ["color"], value: undefined },
  ]);
  const dispatch = useDispatch();

  useEffect(() => {
    function getCategories() {
      const payload = api.tag.getTags();
      dispatch({ type: GET_TAGS, payload: payload });
    }
    getCategories();
  }, [dispatch]);

  function deleteConfirm(record: any) {
    confirm({
      title: `确定要删除【${record.name}】吗？`,
      icon: <ExclamationCircleOutlined />,
      content: `删除【${record.name}】`,
      onOk() {
        const payload = api.tag.deleteTag(record._id);
        dispatch({ type: DELETE_TAG, _id: record._id, payload: payload });
      },
    });
  }

  function createTag() {
    form
      .validateFields()
      .then((values) => {
        const _id = form.getFieldValue("_id");
        const name = form.getFieldValue("name");
        const color = form.getFieldValue("color");
        if (_id) {
          const payload = api.tag.editTag(_id, name, color);
          dispatch({
            type: EDIT_TAG,
            _id: _id,
            name: name,
            color: color,
            payload: payload,
          });
        } else {
          const payload = api.tag.createTag(name, color);
          dispatch({ type: ADD_TAG, payload: payload });
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
      title: "标签名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "标签颜色",
      dataIndex: "color",
      key: "color",
      render: (value: string) => <Tag color={value}>{value}</Tag>,
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
                { name: ["color"], value: undefined },
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
  const tags = useTypedSelector((state) => state.tag.tags);
  const [form] = Form.useForm();
  return (
    <div>
      <PageHeader
        className="site-page-header"
        title="标签管理"
        subTitle="This is a subname"
        extra={[
          <Button
            key="add-article"
            type="primary"
            onClick={() => {
              setFields([
                { name: ["_id"], value: undefined },
                { name: ["name"], value: undefined },
                { name: ["color"], value: undefined },
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
          dataSource={tags}
        />
      </div>
      <Modal
        title={`${fields[0].value ? "编辑" : "新增"}标签`}
        visible={modalVisible}
        onOk={() => createTag()}
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
            label="标签名"
            rules={[
              {
                required: true,
                message: "请输入标签名！",
              },
            ]}
          >
            <Input placeholder="请输入标签名" />
          </Form.Item>
          <Form.Item
            name="color"
            label="标签颜色"
            rules={[
              {
                required: true,
                message: "请选择标签颜色！",
              },
            ]}
          >
            <Select style={{ width: 120 }}>
              <Option value="#E87A90">
                <Tag color="#E87A90">薄紅</Tag>
              </Option>
              <Option value="#EB7A77">
                <Tag color="#EB7A77">甚三紅</Tag>
              </Option>
              <Option value="#CB4042">
                <Tag color="#CB4042">赤紅</Tag>
              </Option>
              <Option value="#FFB11B">
                <Tag color="#FFB11B">山吹</Tag>
              </Option>
              <Option value="#A5A051">
                <Tag color="#A5A051">鶸茶</Tag>
              </Option>
              <Option value="#90B44B">
                <Tag color="#90B44B">鶸萌黄</Tag>
              </Option>
              <Option value="#6D2E5B">
                <Tag color="#6D2E5B">蒲葡</Tag>
              </Option>
              <Option value="#FC9F4D">
                <Tag color="#FC9F4D">萱草</Tag>
              </Option>
              <Option value="#BC9F77">
                <Tag color="#BC9F77">白茶</Tag>
              </Option>
              Ï
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
