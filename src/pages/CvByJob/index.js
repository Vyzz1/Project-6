import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCvByJobs } from "../../services/getCvByJobs";
import { Button, Col, Row, Space, Table } from "antd";
import DeleteService from "../../components/DeleteService";
import Title from "antd/es/typography/Title";
import { useDispatch } from "react-redux";
import AiOutlineEye from "@ant-design/icons";
import { update } from "../../action/update";

function CvByJob() {
  const { id } = useParams();
  const [cv, setCv] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const response = await getCvByJobs(id);
      if (response) {
        setCv(response);
      }
    };
    fetch();
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
              onClick={() => handleVisitCV(record?.id)}
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleVisitCV = (id) => {
    navigate(`/admin/cv/${id}`);
    let body = {
      statusRead: true,
    };
    dispatch(update("cv", body, id - 1));
  };
  return (
    <>
      <Title>Lọc CV Theo Job</Title>{" "}
      <Row>
        <Col xl={24}>
          <Table columns={columns} dataSource={dataSource} />
        </Col>
      </Row>
    </>
  );
}

export default CvByJob;
