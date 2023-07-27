import { Button, Dropdown, Layout, Modal, Space, Tooltip } from "antd";
import "./LayoutDefault.scss";
import logo from "../../images/logo.png";
import logoFold from "../../images/logo-fold.png";
import { useEffect, useState } from "react";
import { MenuFoldOutlined } from "@ant-design/icons";
import MenuSider from "../../components/MenuSider";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { GetCookie } from "../../GetCookie";
import { IoHomeOutline } from "react-icons/io5";
import { Get } from "../../utils/requestFirebase";
import {
  DashboardOutlined,
  SettingFilled,
  AntDesignOutlined,
  BankOutlined,
  TeamOutlined,
  LoginOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { RiMenu3Line } from "react-icons/ri";
const { Sider, Content } = Layout;

function LayoutDefault() {
  const handleDelete = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "info=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/");
  };
  const token = GetCookie("token");
  const [company, setCompany] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const response = await Get("company");
      if (response) {
        setCompany(response);
      }
    };
    fetch();
  }, []);
  const navigate = useNavigate();
  const [city, setCity] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const response = await Get("city");
      if (response) {
        setCity(response);
      }
    };
    fetch();
  }, []);
  const [collapsed, setCollapsed] = useState(false);
  const cityName = city?.filter((_, i) => i > 0);

  let items = [];
  if (!token) {
    items = [
      {
        key: "1",
        icon: <IoHomeOutline />,
        label: <Link to={"/"}>Trang chủ</Link>,
      },
      {
        key: "2",
        icon: <BankOutlined />,
        label: "Danh sách công ty",
        children: company.map((value) => ({
          key: Math.random() * 100,
          label: <Link to={`company/${value.id}`}>{value.companyName}</Link>,
        })),
      },
      {
        key: "city",
        label: "Tìm việc theo thành phố",
        children: cityName.map((value, index) => ({
          key: index,
          label: <Link to={`search/${value.value}/all`}>{value.value}</Link>,
        })),
      },
      {
        key: "login",
        label: <Tooltip title="Dành cho nhà tuyển dụng">Đăng nhập</Tooltip>,
        icon: <LoginOutlined />,
        onClick: () => {
          Modal.confirm({
            title: "Chỉ dành cho nhà tuyển dụng ?",
            okText: "Tiếp tục",
            cancelText: "Quay lại",
            onOk: () => {
              navigate("/login");
            },
          });
        },
      },
    ];
  } else {
    items = [
      {
        key: "/",
        icon: <DashboardOutlined />,
        label: <Link to={"/dashboard"}>Dashboard</Link>,
      },
      {
        key: "settings",
        icon: <SettingFilled />,
        label: "Settings",
        children: [
          {
            key: "company",
            icon: <BankOutlined />,
            label: <Link to={"setting/company"}>Setting Company</Link>,
          },
          {
            key: "jobs",
            icon: <AntDesignOutlined />,
            label: <Link to={"setting/jobs"}>Setting Jobs</Link>,
          },
          {
            key: "cv",
            icon: <TeamOutlined />,
            label: <Link to={"setting/cv"}>Setting CV</Link>,
          },
        ],
      },
      {
        key: "logout",
        icon: <LogoutOutlined />,
        label: "Logout",
        onClick: () => {
          Modal.confirm({
            title: "Do you want to log out",
            okText: "Yes",
            cancelText: "Cancel",
            onOk: () => handleDelete(),
          });
        },
      },
    ];
  }

  return (
    <>
      <Layout className="layout">
        <header className="layout__header">
          <div
            className={
              "layout__logo " + (collapsed ? "layout__logo--fold" : "")
            }
          >
            <img src={collapsed ? logoFold : logo} alt="Logo" />
          </div>

          <div className="layout__nav">
            <div className="layout__nav-left">
              <Button
                className="toggle__button"
                icon={<MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
              ></Button>
            </div>
            <div
              className="layout__nav-right"
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Space>
                <Button className="register_layout-button">
                  <Link to={"register"}>Đăng ký làm nhà tuyển dụng</Link>
                </Button>
                <Dropdown
                  className="dropdown-menu-600"
                  menu={{
                    items,
                  }}
                >
                  <Space>
                    <RiMenu3Line size={25} color="#2656ba" />
                  </Space>
                </Dropdown>
              </Space>
            </div>
          </div>
        </header>
        <Layout
          className={"layout__main " + (collapsed ? "layout__main--fold" : "")}
        >
          <Sider
            breakpoint="xxl"
            onBreakpoint={(broken) => {
              setCollapsed(broken);
            }}
            className="layout__sider"
            collapsed={collapsed}
            theme="light"
          >
            <MenuSider />
          </Sider>
          <Content className="layout__content">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default LayoutDefault;
