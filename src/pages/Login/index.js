import { Col, Input, Row, Button, notification, Form } from "antd";
import React, { useEffect, useState } from "react";
import "./Login.css";
import { Get } from "../../utils/requestFirebase";
import { setCookie } from "../../SetCookie";
import { useNavigate } from "react-router-dom";
function Login() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await Get("company");
      if (response) {
        setData(response);
      }
    };
    fetchUsers();
  }, []);
  const Context = React.createContext({
    name: "Default",
  });
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (str) => {
    api[str.icon]({
      message: str.message,
      description: str.description,
      placement: "topRight",
    });
  };

  const handleSubmit = (e) => {
    let email = e.email;
    let password = e.password;
    const user = data.filter(
      (user) => user.email === email && user.password === password
    );
    let currentUser = user[user.length - 1];
    if (user.length > 0) {
      setCookie("token", currentUser.token, 1000, 1);
      let info = {
        email: email,
        id: currentUser.id,
      };
      setCookie("info", JSON.stringify(info), 1000, 1);
      let str = {
        message: "Đăng nhập thành công",
        description: "Chúc mừng bạn đã đăng nhập thành công",
        icon: "success",
      };
      openNotification(str);
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } else {
      let str = {
        message: "Đăng nhập thất bại",
        description: "Tài khoản hoặc mật khẩu sai",
        icon: "error",
      };
      openNotification(str);
    }
  };
  const contextValue = {
    name: "Default",
  };
  return (
    <>
      <Context.Provider value={contextValue}>
        {contextHolder}
        <div className="container">
          <Form onFinish={handleSubmit} autoComplete="false">
            <div className="box_head">
              <div className="title">Login</div>
              <div className="subtitle">
                {" "}
                Lorem ipsum dolor sit amet consectetur adipisicing elit.{" "}
              </div>
            </div>
            <Row gutter={[10, 10]}>
              <Col xxl={24} xl={24} lg={12} md={12} sm={24} xs={24}>
                <h3> Email </h3>
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email" },
                  ]}
                >
                  <Input placeholder="Enter your email" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[10, 10]}>
              <Col xxl={12} xl={24} lg={12} md={12} sm={24} xs={24}>
                <h3> PassWord</h3>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password placeholder="Enter your password" />
                </Form.Item>
              </Col>
            </Row>
            <Col xxl={12} xl={24} lg={12} md={12} sm={24} xs={24}>
              <Form.Item style={{ marginTop: "40px" }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  Login
                </Button>
              </Form.Item>
            </Col>
          </Form>
        </div>
      </Context.Provider>
    </>
  );
}
export default Login;
