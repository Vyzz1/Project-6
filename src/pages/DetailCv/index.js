import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCvDetails } from "../../services/getCvDetails";
import Title from "antd/es/typography/Title";

import {
  Card,
  Descriptions,
  Divider,
  List,
  Row,
  Col,
  Tag,
  Button,
  Modal,
} from "antd";
import "./DetailCv.css";
import { BiSolidSend } from "react-icons/bi";
import { getJobDetails } from "../../services/getJobDetails";
import DeleteService from "../../components/DeleteService";
function DetailCv() {
  const { id } = useParams();
  const [cv, setCv] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const response = await getCvDetails(id);
      if (response) {
        setCv(response[0]);
      }
    };
    fetch();
  }, [id]);

  let data = cv?.linkProject;
  const [job, setJob] = useState([]);
  let idJob = cv?.idJob;

  useEffect(() => {
    const fetch = async () => {
      const response = await getJobDetails(idJob);
      if (response) {
        setJob(response[0]);
      }
    };
    fetch();
  }, [idJob]);
  const [show, setShow] = useState(false);
  const handleShowModal = () => {
    setShow(true);
  };
  const handleCloseModal = () => {
    setShow(false);
  };

  return (
    <>
      <Title level={2} style={{ textAlign: "center" }}>
        {" "}
        Chi tiết CV
      </Title>
      <Row gutter={[20, 20]}>
        <Col xl={16}>
          <Divider orientation="left">
            <p style={{ color: "red", fontSize: "20px" }}>Thông tin ứng viên</p>
          </Divider>
          <Card>
            <Descriptions layout="vertical">
              <Descriptions.Item label="Tên ứng viên">
                <b style={{ fontWeight: "600" }}>{cv?.name} </b>
              </Descriptions.Item>
              <Descriptions.Item label="Telephone">
                {cv?.phone}
              </Descriptions.Item>
              <Descriptions.Item label="Địa chỉ">{cv?.city}</Descriptions.Item>
              <Descriptions.Item label="Giờ làm việc">
                {cv?.email}
              </Descriptions.Item>
              <Descriptions.Item label="Email">{cv?.phone}</Descriptions.Item>
              <Descriptions.Item label="Gửi vào lúc">
                {cv?.createAt}
              </Descriptions.Item>
            </Descriptions>
          </Card>
          <Divider orientation="left">
            <p style={{ color: "red", fontSize: "20px" }}>
              Giới thiệu bản thân
            </p>
          </Divider>
          <Card>
            <Card>
              <div>{cv?.description}</div>
            </Card>
            <hr style={{ margin: "25px 0", borderColor: "blue" }}></hr>
            <p style={{ fontWeight: "600", fontSize: "18px" }}>
              Link Project :
            </p>
            <List
              bordered
              dataSource={data}
              renderItem={(item) => (
                <List.Item>
                  {" "}
                  <BiSolidSend
                    color="blue"
                    style={{ marginBottom: "-1px", marginRight: "8px" }}
                  />{" "}
                  {item}
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xl={8}>
          <div className="job_wrapper">
            <Divider>
              <p style={{ color: "#437ae9", fontSize: "20px" }}>
                Thông tin job ứng tuyển
              </p>
            </Divider>
            <Card>
              <Title level={4}> {job?.name}</Title>
              <p>
                {" "}
                Salary $<b>{job?.salary}</b>{" "}
              </p>

              <div className="jobs-company__skills">
                <span> Tags : </span>
                {job?.tags?.map((tag, index) => (
                  <Tag key={index} className="tag">
                    {tag}
                  </Tag>
                ))}
              </div>
              <div className="city" style={{ margin: "15px 0" }}>
                <span> City : </span>
                {job?.city?.map((tag, index) => (
                  <Tag key={index} className="tag">
                    {tag}
                  </Tag>
                ))}
              </div>
              <Button type="primary" size="middle" onClick={handleShowModal}>
                {" "}
                Xem mô tả job
              </Button>
              <Modal
                centered
                open={show}
                onCancel={handleCloseModal}
                footer={null}
              >
                <Divider> Mô tả</Divider>
                <Card>
                  <div className="card_description">{job?.description}</div>
                </Card>
                <div
                  className="button_modal"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    margin: "20px 0 0",
                  }}
                >
                  <Button onClick={handleCloseModal}>Đóng</Button>
                </div>
              </Modal>
            </Card>
          </div>
        </Col>
        <DeleteService items={cv} type={"cv"} />
      </Row>
    </>
  );
}
export default DetailCv;
