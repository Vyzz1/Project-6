import { Button, Form, Input, InputNumber, Select, Switch } from "antd";
import { createRoom } from "../../services/roomsService";

function CreateRoom() {
  const [form] = Form.useForm();

  const utils = [
    {
      value: "Điều hòa",
      label: "Điều hòa",
    },
    {
      value: "Nóng lạnh",
      label: "Nóng lạnh",
    },
    {
      value: "Tủ lạnh",
      label: "Tủ lạnh",
    },
    {
      value: "Điều hòa 3",
      label: "Điều hòa 3",
    },
    {
      value: "Điều hòa 4",
      label: "Điều hòa 4",
    },
  ];

  const rules = [
    {
      required: true,
      message: "Bắt buộc!",
    },
  ];

  const handleFinish = async (values) => {
    console.log(values);
    const response = await createRoom(values);
    if(response) {
      form.resetFields();
      alert("Tạo phòng thành công!");
    } else {
      alert("Tạo phòng thất bại!");
    }
  };

  return (
    <>
      <h2>Tạo phòng mới</h2>

      <Form
        onFinish={handleFinish}
        initialValues={{
          quantityBed: 1,
          quantityPeople: 1,
          status: true,
        }}
        form={form}
        layout="vertical"
      >
        <Form.Item name="name" label="Tên phòng" rules={rules}>
          <Input />
        </Form.Item>
        <Form.Item name="quantityBed" label="Số lượng giường" rules={rules}>
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item
          name="quantityPeople"
          label="Số lượng người tối đa"
          rules={rules}
        >
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item name="description" label="Mô tả" rules={rules}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="utils" label="Tiện ích" rules={rules}>
          <Select options={utils} mode="multiple" />
        </Form.Item>
        <Form.Item name="status" label="Trạng thái" valuePropName="checked">
          <Switch checkedChildren="Còn phòng" unCheckedChildren="Hết phòng" />
        </Form.Item>
        <Form.Item name="type" label="Loại phòng" valuePropName="checked">
          <Switch checkedChildren="VIP" unCheckedChildren="Thường" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Tạo mới
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default CreateRoom;
