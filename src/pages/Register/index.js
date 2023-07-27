import {
  Col,
  Input,
  Row,
  Button,
  notification,
  Form,
  InputNumber,
  Space,
} from "antd";
import React, { useEffect, useState } from "react";
import "./Register.css";
import { Get } from "../../utils/requestFirebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createCompany } from "../../action/createCompany";
import RandomString from "../../helpers/RandomString";
import { GetLength } from "../../utils/GetLength";
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
  const dispatch = useDispatch();
  const [length, setLength] = useState(0);
  useEffect(() => {
    const fetch = async () => {
      const response = await GetLength("company");
      if (response) {
        setLength(response);
      }
    };
    fetch();
  }, []);
  const handleSubmit = (e) => {
    const user = data.filter((user) => user.email === e.email);
    if (e.email === user[user.length - 1]?.email) {
      let str = {
        message: "Tài khoản đã tồn tại",
        description: `Tài khoản ${
          user[user.length - 1].email
        } đã tồn tại trên hệ thông`,
        icon: "warning",
      };
      openNotification(str);
      return;
    } else if (e.password !== e.confirmPassword) {
      let str = {
        message: "Mật khẩu không khớp",
        description: "Mật khẩu bạn nhập không khớp",
        icon: "warning",
      };
      openNotification(str);
      return;
    } else {
      dispatch(createCompany({ ...e, token: RandomString(20) }, length));
      let str = {
        message: "Đăng ký thành công",
        description: "Chúc mừng bạn đã đăng ký thành công",
        icon: "success",
      };
      openNotification(str);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };
  const contextValue = {
    name: "Default",
  };

  return (
    <>
      <Context.Provider value={contextValue}>
        {contextHolder}
        <div className="container_register">
          <Form onFinish={handleSubmit} autoComplete="false">
            <div className="box_head">
              <div className="title">Trang đăng ký công ty</div>
              <div className="subtitle">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </div>
            </div>

            <Form.Item
              label="Tên công ty"
              name="companyName"
              rules={[
                {
                  required: true,
                  message: "Please input your company name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email" }]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>
            <Form.Item
              label="Password"
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
            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Please input your password again!",
                },
              ]}
            >
              <Input.Password placeholder="Enter your password again" />
            </Form.Item>
            <Form.Item
              label="Telephone"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please input your phone!",
                },
              ]}
            >
              <Input placeholder="Enter your company's phone" />
            </Form.Item>
            <Form.Item
              label="Address"
              name="address"
              rules={[
                {
                  required: true,
                  message: "Please input your phone!",
                },
              ]}
            >
              <Input placeholder="Enter your company's description" />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please input your description!",
                },
              ]}
            >
              <Input.TextArea
                placeholder="Enter your company's description"
                showCount
              />
            </Form.Item>
            <Form.Item
              label="Detail Company"
              name="detail"
              rules={[
                {
                  required: true,
                  message: "Please input your detail!",
                },
              ]}
            >
              <Input.TextArea
                placeholder="Ex: Top 3 reason to join us..."
                showCount
              />
            </Form.Item>
            <Form.Item
              label="Working Time"
              name="workingTime"
              rules={[
                {
                  required: true,
                  message: "Please input your detail!",
                },
              ]}
            >
              <Input placeholder="Ex : T2-T7 " />
            </Form.Item>
            <Form.Item
              label="Website"
              name="website"
              rules={[
                {
                  required: true,
                  message: "Please input your detail!",
                },
              ]}
            >
              <Input placeholder="Ex : www.google.com" />
            </Form.Item>
            <Form.Item
              label="Quantity People"
              name="quantityPeople"
              rules={[
                {
                  required: true,
                  message: "Please input your detail!",
                },
              ]}
            >
              <InputNumber min={1} />
            </Form.Item>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Space>
                <Button htmlType="reset"> Tạo lại </Button>

                <Button type="primary" htmlType="submit">
                  {" "}
                  Tạo{" "}
                </Button>
              </Space>
            </div>
          </Form>
        </div>
      </Context.Provider>
    </>
  );
}
export default Login;
