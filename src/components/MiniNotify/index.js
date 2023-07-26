import { Button, Dropdown } from "antd";
import { BellOutlined } from "@ant-design/icons";
import "./MiniNotify.css";

const items = [
  {
    key: "1",
    label: (
      <div className="mini-notify__item">
        <div className="mini-notify__item-icon">
          <BellOutlined />
        </div>
        <div className="mini-notify__item-content">
          <div className="mini-notify__item-title">
            Lorem Ipsum is simply dummy text 1
          </div>
          <div className="mini-notify__item-time">8 min ago</div>
        </div>
      </div>
    ),
  },
  {
    key: "2",
    label: (
      <div className="mini-notify__item">
        <div className="mini-notify__item-icon">
          <BellOutlined />
        </div>
        <div className="mini-notify__item-content">
          <div className="mini-notify__item-title">
            Lorem Ipsum is simply dummy text 2
          </div>
          <div className="mini-notify__item-time">8 min ago</div>
        </div>
      </div>
    ),
  },
];

function MiniNotify() {
  return (
    <>
      <Dropdown
        menu={{
          items,
        }}
        trigger={["click"]}
        dropdownRender={(menus) => (
          <>
            <div className="mini-notify__dropdown">
              <div className="mini-notify__head">
                <span>
                  <BellOutlined /> Notification
                </span>
                <Button href="#" size="small" type="link">
                  View All
                </Button>
              </div>
              <div className="mini-notify__body">{menus}</div>
            </div>
          </>
        )}
      >
        <Button icon={<BellOutlined />}></Button>
      </Dropdown>
    </>
  );
}

export default MiniNotify;
