import {
  Button,
  Col,
  Form,
  Row,
  Modal,
  Input,
  Switch,
  Select,
  Space,
  Table,
  Tag,
  InputNumber,
  message,
} from "antd";
import { GetCookie } from "../../GetCookie";
import { useEffect, useState } from "react";
import { Get } from "../../utils/requestFirebase";
import { formatDateTime } from "../../utils/formatDateTime";
import EditJob from "../../components/EditJob";
import { useNavigate } from "react-router-dom";
import DeleteService from "../../components/DeleteService";
import { GetLength } from "../../utils/GetLength";
import { useDispatch } from "react-redux";
import { createJob } from "../../action/createJob";
import { EyeOutlined } from "@ant-design/icons";
import { getJobByCompany } from "../../services/getJobByCompany";
function SettingJobs() {
  const id = JSON.parse(GetCookie("info")).id;
  const [openModal, setOpenModal] = useState(false);
  const [tags, setTags] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [length, setLength] = useState(0);
  useEffect(() => {
    const fetch = async () => {
      const respone = await GetLength("jobs");
      if (respone) {
        setLength(respone);
      }
    };
    fetch();
  }, []);
  const handleFinish = function (e) {
    let body = { ...e, idCompany: id, createAt: formatDateTime(Date.now()) };
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenModal(false);
    }, 1500);
    dispatch(createJob(body, length));
    setTimeout(() => {
      message.success("Tạo thành công");
    }, 1800);
    setTimeout(() => {
      navigate(0);
    }, 2800);
  };

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      const response = await Get("tags");
      if (response) {
        setTags(response);
      }
    };
    fetch();
  }, []);
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
  const [jobs, setJob] = useState([]);
  useEffect(() => {
    const fetchJobDetails = async () => {
      const response = await getJobByCompany(id, 1);
      if (response) {
        setJob(response);
      }
    };
    fetchJobDetails();
  }, [id]);
  const handleDetail = function (e) {
    navigate("/admin/jobs/" + e);
  };
  const handeVisitCv = (id) => {
    navigate(`/admin/job/${id}/cv`);
  };
  const columns1 = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (_, record) => (
        <div className="jobs__tags">
          {record?.tags?.map((tag, index) => (
            <Tag key={index} className="tag">
              {" "}
              {tag}{" "}
            </Tag>
          ))}
        </div>
      ),
    },
    {
      title: "Mức lương",
      dataIndex: "salary",
      key: "salary",
      sorter: (a, b) => a.salary - b.salary,
    },
    {
      title: "Create At",
      dataIndex: "createAt",
      key: "createAt",
    },
    {
      title: "Update At",
      dataIndex: "updateAt",
      key: "updateAt",
    },
    {
      title: "Xem cv",
      dataIndex: "visitcv",
      key: "visitcv",
      render: (_, record) => (
        <Button
          onClick={() => handeVisitCv(record.id)}
          icon={<EyeOutlined />}
        ></Button>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (_, record) => <> {record.status === true ? "Bật" : "Tắt "} </>,
      filters: [
        {
          value: true,
          text: "Bật",
        },
        {
          value: false,
          text: "Tắt",
        },
      ],
      onFilter: (value, record) => {
        return record?.status === value;
      },
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <>
          <Space size="small">
            <Button onClick={() => handleDetail(record.id)}> Chi tiết </Button>
            <EditJob items={record} tags={tags} city={city} />
            <DeleteService items={record} type={"jobs"} />
          </Space>
        </>
      ),
    },
  ];
  const dataTable = jobs?.map((job, i) => ({
    key: i + 1,
    name: job.name,
    tags: job.tags,
    salary: job.salary,
    createAt: job.createAt,
    updateAt: job.updateAt,
    status: job.status,
    city: job.city,
    description: job.description,
    id: job.id,
  }));

  return (
    <>
      <div className="box_head">
        <div className="title">Trang quản lý Jobs</div>
        <div className="subtitle">
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit
        </div>
      </div>
      <Row>
        <Col>
          <Button type="primary" onClick={() => setOpenModal(true)}>
            Thêm jobs mới
          </Button>
        </Col>
        <Modal
          centered
          title="Thêm jobs mới"
          open={openModal}
          footer={null}
          onCancel={() => {
            setOpenModal(false);
          }}
        >
          {/* Form */}

          <Form onFinish={handleFinish}>
            <Form.Item
              label="Tên Job"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên job",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Tags"
              name="tags"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn ít nhất một tag",
                },
              ]}
            >
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
            <Form.Item
              label="Mức lương"
              name="salary"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mức lương",
                },
              ]}
            >
              <InputNumber
                formatter={(value) =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
              />
            </Form.Item>
            <Form.Item
              label="Thành phố"
              name="city"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn ít nhất một thành phố",
                },
              ]}
            >
              <Select
                mode="multiple"
                allowClear
                style={{
                  width: "100%",
                }}
                placeholder="Please select"
                options={city}
              />
            </Form.Item>
            <Form.Item
              label="Mô tả"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mô tả công việc",
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              label="Trạng thái"
              name="status"
              valuePropName="checked"
              initialValue={true}
            >
              <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
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
              <Button onClick={() => setOpenModal(false)}>Đóng</Button>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginLeft: "10px" }}
                loading={loading}
              >
                Tạo mới
              </Button>
            </div>
          </Form>
        </Modal>
      </Row>
      <Row>
        <Col xl={24}>
          <Table
            style={{ margin: "25px 0", overflow: "scroll" }}
            dataSource={dataTable}
            columns={columns1}
            size="large"
            loading={loading}
          />
        </Col>
      </Row>
    </>
  );
}
export default SettingJobs;
