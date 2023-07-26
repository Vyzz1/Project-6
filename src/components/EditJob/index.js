import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Switch,
  message,
} from "antd";
import { useState } from "react";
import { deepEqual } from "../../helpers/helpers";
import { useDispatch } from "react-redux";
import { update } from "../../action/update";
import { useNavigate } from "react-router-dom";
import { formatDateTime } from "../../utils/formatDateTime";
function EditJob({ items, tags, city }) {
  const [openInfoDetail, setOpenInfoDetail] = useState(false);
  const dispatch = useDispatch();
  const showModalDetail = () => {
    console.log(items);
    setOpenInfoDetail(true);
  };
  const handleCancel = () => {
    setOpenInfoDetail(false);
  };
  let obj = {
    city: items?.city,
    description: items?.description,
    name: items?.name,
    salary: items?.salary,
    status: items?.status,
    tags: items?.tags,
  };
  const navigate = useNavigate();
  const handleFinish = (body) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenInfoDetail(false);
      setTimeout(() => {
        if (deepEqual(body, obj)) {
          message.info("Nothing changed");
        } else {
          dispatch(
            update(
              "jobs",
              { ...body, updateAt: formatDateTime(Date.now()) },
              items?.id - 1
            )
          );
          message.success(" Updated successfully");
          setTimeout(() => {
            navigate(0);
          }, 400);
        }
      }, 500);
    }, 2000);
  };
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Button onClick={showModalDetail}> Sửa </Button>
      <Modal
        centered
        title="Sửa Jobs"
        open={openInfoDetail}
        footer={null}
        onCancel={() => {
          handleCancel();
        }}
      >
        {/* Form */}

        <Form onFinish={handleFinish} initialValues={items}>
          <Form.Item name="name" label="Tên job">
            <Input />
          </Form.Item>
          <Form.Item name="tags" label="Tags">
            <Select
              mode="multiple"
              allowClear
              style={{
                width: "100%",
              }}
              placeholder="Please select"
              options={tags}
            />
          </Form.Item>
          <Form.Item name="salary" label="Salary">
            <InputNumber />
          </Form.Item>
          <Form.Item name="city" label="City">
            <Select
              mode="multiple"
              allowClear
              style={{
                width: "100%",
              }}
              placeholder="Please select"
              name="city"
              options={city}
            />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea name="description" />
          </Form.Item>
          <Form.Item name="status" label="Trạng thái">
            <Switch
              unCheckedChildren="Tắt"
              checkedChildren="Bật"
              defaultChecked={items?.status}
            />
          </Form.Item>

          {/* End Form */}
          <div
            className="button_modal"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Button onClick={handleCancel}>Đóng</Button>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginLeft: "10px" }}
              loading={loading}
            >
              Sửa thông tin
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}
export default EditJob;
