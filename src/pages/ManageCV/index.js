import { Button, Col, Row, Space, Table } from "antd";
import { GetCookie } from "../../GetCookie";
import { getCVByCompany } from "../../services/getCVByCompany";
import { useState, useEffect } from "react";
import Title from "antd/es/typography/Title";
import { AiOutlineEye } from "react-icons/ai";
import DeleteService from "../../components/DeleteService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { update } from "../../action/update";
function ManageCv() {
  const id = JSON.parse(GetCookie("info")).id;
  const [cv, setCV] = useState([]);
  useEffect(() => {
    const fetchCv = async () => {
      const response = await getCVByCompany(id);
      if (response) {
        setCV(response);
      }
    };
    fetchCv();
  }, [id]);

  const filtersId = cv
    ?.map((value) => ({
      text: value.idJob,
      value: value.idJob,
    }))
    .filter((item, index, self) => {
      return (
        index ===
        self.findIndex((t) => t.text === item.text && t.value === item.value)
      );
    });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleVisitCV = (id) => {
    navigate(`/admin/cv/${id}`);
    let body = {
      statusRead: true,
    };
    dispatch(update("cv", body, id - 1));
  };
  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Id Job",
      dataIndex: "idJob",
      key: "idJob",
      filters: filtersId,

      onFilter: (value, record) => {
        // Convert the string value to a number
        const numericValue = parseInt(value);

        // Check if idJob is an array and includes the numericValue
        if (Array.isArray(record?.idJob)) {
          return record.idJob.includes(numericValue);
        }

        // Otherwise, check if idJob is a number and equal to numericValue
        return record?.idJob === numericValue;
      },
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Ngày gửi",
      dataIndex: "createAt",
      key: "createAt",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <> {record.status === true ? "Đã đọc" : "Chưa đọc"} </>
      ),
      filters: [
        {
          text: "Đã đọc",
          value: true,
        },
        {
          text: "Chưa đọc",
          value: false,
        },
      ],
      onFilter: (value, record) => {
        return record.status === value;
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
            <Button
              icon={
                <>
                  <AiOutlineEye />
                </>
              }
              onClick={() => handleVisitCV(record?.id, record?.status)}
            >
              {" "}
              Chi tiết{" "}
            </Button>
            <DeleteService items={record} type={"cv"} />
          </Space>
        </>
      ),
    },
  ];
  const dataSource = cv?.map((cv) => ({
    name: cv.name,
    phone: cv.phone,
    email: cv.email,
    createAt: cv.createAt,
    status: cv.statusRead,
    idJob: cv.idJob,
    id: cv.id,
    key: Math.random() * 1000,
  }));

  return (
    <>
      <Title level={2} style={{ textAlign: "center" }}>
        {" "}
        TRANG QUẢN LÝ CV
      </Title>
      <Row>
        <Col xl={24}>
          <Table
            style={{ margin: "25px 0", overflow: "scroll" }}
            columns={columns}
            dataSource={dataSource}
            size="large"
          />
        </Col>
      </Row>
    </>
  );
}
export default ManageCv;
