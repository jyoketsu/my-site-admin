import React, { useState, useEffect } from "react";
import "./Login.css";
import DocumentTitle from "react-document-title";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { login, register } from "../../redux/actions/authActions";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../redux/reducer/RootState";
import { useHistory } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isRegister, setIsRegister] = useState(false);
  const user = useTypedSelector((state) => state.auth.user);

  useEffect(() => {
    if (user && user._id) {
      history.push("/");
    }
  }, [user, history]);

  const onFinish = (values: any) => {
    if (isRegister) {
      dispatch(register(values.username, values.password));
    } else {
      dispatch(login(values.username, values.password));
    }
  };

  return (
    <DocumentTitle title="登录">
      <div className="login-wrapper">
        <div className="login-box">
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: "请输入用户名！" }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="用户名"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "请输入密码!" }]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
              />
            </Form.Item>
            {isRegister ? (
              <Form.Item
                name="confirm"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "请确认密码!",
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject("两次密码输入不一致!");
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                />
              </Form.Item>
            ) : null}

            {!isRegister ? (
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>记住登录状态</Checkbox>
                </Form.Item>
              </Form.Item>
            ) : null}

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                {isRegister ? "注册" : "登录"}
              </Button>
              或者
              <Button type="link" onClick={() => setIsRegister(!isRegister)}>
                {isRegister ? "登录" : "立即注册"}!
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="ICP-licensing">
          ©2020 Jyoketsu All Rights Reserved{" "}
          <span
            onClick={() =>
              window.open("http://www.beian.miit.gov.cn", "_blank")
            }
          >
            苏ICP备20038833号
          </span>
        </div>
      </div>
    </DocumentTitle>
  );
}
