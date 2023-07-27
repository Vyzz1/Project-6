import { Card, Carousel, Col, Descriptions, Image, Row } from "antd";
import { GetCookie } from "../../GetCookie";
import { useState } from "react";
import { useEffect } from "react";
import { getJobByCompany } from "../../services/getJobByCompany";
import { ImListNumbered } from "react-icons/im";
import { IoNewspaperOutline } from "react-icons/io5";
import "./Dashboard.scss";
import { getCVByCompany } from "../../services/getCVByCompany";
import { countJobsStatus, countUnRead } from "../../helpers/helpers";
import { getCompanyDetails } from "../../services/getCompanyDetails";
import imageCompany from "../../images/hands-1063442_960_720.jpg";
import { SlPeople } from "react-icons/sl";
import DrawingJobs from "../../components/DrawingJobs";

function Dashboard() {
  const id = JSON.parse(GetCookie("info")).id;
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
  console.log(jobs);
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
  let unReadCv = 0;
  if (cv.length > 0) {
    unReadCv = countUnRead(cv);
  }

  const [company, setCompany] = useState({});

  useEffect(() => {
    const fetch = async () => {
      const response = await getCompanyDetails(id);
      if (response) {
        setCompany(response[0]);
      }
    };
    fetch();
  }, [id]);
  const contentStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",

    background: "#364d79",
  };
  console.log(countJobsStatus(jobs));
  return (
    <>
      <Row gutter={[20, 20]}>
        <Col xxl={8} xl={8} lg={6} md={12} sm={24} xs={24}>
          <Card>
            <div className="jobs_number">
              <div className="jobs_number_value">
                <h3> {jobs.length} </h3>
                <p> Jobs đang có </p>
              </div>
              <div className="jobs_number_img">
                <ImListNumbered className="jobs_number-icon" />
              </div>
            </div>
          </Card>
        </Col>
        <Col xxl={8} xl={8} lg={6} md={12} sm={24} xs={24}>
          <Card>
            <div className="jobs_number">
              <div className="jobs_number_value">
                <h3> {cv.length} </h3>
                <p> Số lượng CV nộp vào </p>
              </div>
              <div className="jobs_number_img">
                <IoNewspaperOutline className="jobs_number-icon" />
              </div>
            </div>
          </Card>
        </Col>
        <Col xxl={8} xl={8} lg={6} md={12} sm={24} xs={24}>
          <Card>
            <div className="jobs_number_count">
              <div className="jobs_number_value">
                <span>
                  {" "}
                  <b>{unReadCv} </b>
                </span>
                <span> Cv chưa đọc </span>
                <span>
                  {" "}
                  - <b>{cv.length - unReadCv}</b>{" "}
                </span>
                <span> Cv đã đọc </span>
              </div>
              <div className="jobs_number_value">
                <span>
                  {" "}
                  <b>{countJobsStatus(jobs)}</b>{" "}
                </span>
                <span> Jobs đang tắt </span>
                <span>
                  {" "}
                  - <b> {jobs.length - countJobsStatus(jobs)} </b>
                </span>
                <span> Jobs đang bật </span>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[20, 20]} className="mt-20">
        <Col xxl={16} xl={16} lg={16} md={24} sm={24} xs={24}>
          <div className="card">
            <Descriptions layout="vertical">
              <Descriptions.Item label="Tên công ty">
                {company.companyName}
              </Descriptions.Item>
              <Descriptions.Item label="Telephone">
                {company.phone}
              </Descriptions.Item>
              <Descriptions.Item label="Địa chỉ">
                {company.address}
              </Descriptions.Item>
              <Descriptions.Item label="Giờ làm việc">
                {company.workingTime}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {company.email}
              </Descriptions.Item>
              <Descriptions.Item label="Website">
                {" "}
                <a href="/"> {company.website} </a>{" "}
              </Descriptions.Item>
            </Descriptions>
          </div>
        </Col>
        <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
          <Card>
            <div className="card_dash">
              <div className="company__img">
                <Image src={imageCompany} />
              </div>
              <div className="company__wrapper">
                <div className="company__name">{company.companyName}</div>
                <SlPeople className="icon_location" />
                <span className="company__quantity">
                  {" "}
                  {company.quantityPeople} thành viên{" "}
                </span>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
      <h2 style={{ textAlign: "center", margin: "25px 0" }}>
        {" "}
        Các công việc đang tuyển dụng{" "}
      </h2>
      <Row gutter={[20, 20]} className="mt-20">
        <Col
          xl={{ span: 16, offset: 4 }}
          lg={16}
          md={24}
          sm={24}
          xs={{ span: 24, offset: 0 }}
        >
          <Carousel autoplay={true} dotPosition="bottom" waitForAnimate>
            {jobs.length > 0 &&
              jobs.map((job) => (
                <div
                  className="container_box"
                  style={{ borderRadius: "5px", overflow: "hidden" }}
                  key={job.id} // Use the job id as the unique key
                >
                  <div className="box-test" style={contentStyle}>
                    <DrawingJobs data={[job]} />
                  </div>
                </div>
              ))}
          </Carousel>
        </Col>
      </Row>
    </>
  );
}

export default Dashboard;
