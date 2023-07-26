import { Button, Layout, Space } from "antd";
import "./LayoutDefault.scss";
import logo from "../../images/logo.png";
import logoFold from "../../images/logo-fold.png";
import { useState } from "react";
import { MenuFoldOutlined } from "@ant-design/icons";
import MiniNotify from "../../components/MiniNotify";
import MenuSider from "../../components/MenuSider";
import { Link, Outlet } from "react-router-dom";
const { Sider, Content } = Layout;

function LayoutDefault() {
  const [collapsed, setCollapsed] = useState(false);

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
                icon={<MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
              ></Button>
            </div>
            <div className="layout__nav-right">
              <Space>
                <Button>
                  <Link to={"register"}>Đăng ký làm nhà tuyển dụng</Link>
                </Button>
                <MiniNotify />
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
