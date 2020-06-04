import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../redux/reducer/RootState";
import {
  getTags,
  deleteTag,
  addTag,
  editTag,
} from "../../redux/actions/tagActions";
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
    dispatch(getTags());
  }, [dispatch]);

  function deleteConfirm(record: any) {
    confirm({
      title: `确定要删除【${record.name}】吗？`,
      icon: <ExclamationCircleOutlined />,
      content: `删除【${record.name}】`,
      onOk() {
        dispatch(deleteTag(record._id));
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
          dispatch(editTag(_id, name, color));
        } else {
          dispatch(addTag(name, color));
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
                { name: ["color"], value: record.color },
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
              <Option value="#2EA9DF">
                <Tag color="#2EA9DF">露草</Tag>
              </Option>
              <Option value="#70649A">
                <Tag color="#70649A">二藍</Tag>
              </Option>
              <Option value="#1B813E">
                <Tag color="#1B813E">常磐</Tag>
              </Option>
              <Option value="#3A3226">
                <Tag color="#3A3226">檳榔子染</Tag>
              </Option>
              <Option value="#9E7A7A">
                <Tag color="#9E7A7A">梅鼠</Tag>
              </Option>
              <Option value="#62592C">
                <Tag color="#62592C">海松茶</Tag>
              </Option>
              <Option value="#B5CAA0">
                <Tag color="#B5CAA0">裏柳</Tag>
              </Option>
              <Option value="#F8C3CD">
                <Tag color="#F8C3CD">退紅</Tag>
              </Option>
              <Option value="#A8497A">
                <Tag color="#A8497A">梅紫</Tag>
              </Option>
              <Option value="#0D5661">
                <Tag color="#0D5661">藍</Tag>
              </Option>
              <Option value="#69B0AC">
                <Tag color="#69B0AC">青磁</Tag>
              </Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
