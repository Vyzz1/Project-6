import { Button, Typography } from "antd";
import { useState } from "react";
import { CarOutlined } from "@ant-design/icons";
const { Title } = Typography;

function LearnButton() {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      // Làm gì đó
      setLoading(false);
    }, 5000);
  }

  return (
    <>
      {/* <Button type="primary" block danger={false} disabled>
        Nút bấm
      </Button> */}

      {/* <Button 
        type="primary" 
        loading={loading}
        onClick={handleClick}
        shape="round"
        size="small"
      >
        Nút bấm
      </Button> */}


      <Button icon={<CarOutlined />}></Button>

      <CarOutlined rotate={90} spin={true} />

      <Title>h1. Ant Design</Title>
      <Title level={2} copyable={true}>h2. Ant Design</Title>
    </>
  );
}

export default LearnButton;
