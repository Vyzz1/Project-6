import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCompanyDetails } from "../../services/getCompanyDetails";
import { Row, Tabs, Descriptions, Button, Col } from "antd";
import "./DetailCompany.scss";
import DrawingCompany from "../../components/DrawingCompany";
import DrawingJobs from "../../components/DrawingJobs";
import { getJobByCompany } from "../../services/getJobByCompany";

function DetailCompany() {
  const { idCompany } = useParams();
  const [jobs, setJObs] = useState();
  const [company, setCompany] = useState({});
  useEffect(() => {
    const fetch = async () => {
      const response = await getJobByCompany(idCompany, 2);
      if (response) {
        setJObs(response);
      }
    };
    fetch();
  }, [idCompany]);
  console.log(jobs);
  useEffect(() => {
    const fetch = async () => {
      const response = await getCompanyDetails(idCompany);
      if (response) {
        setCompany(response[0]);
      }
    };
    fetch();
  }, [idCompany]);
  const infoCompany = (
    <Descriptions layout="vertical">
      <Descriptions.Item label="Tên công ty">
        {company.companyName}
      </Descriptions.Item>
      <Descriptions.Item label="Telephone">{company.phone}</Descriptions.Item>
      <Descriptions.Item label="Địa chỉ">{company.address}</Descriptions.Item>
      <Descriptions.Item label="Giờ làm việc">
        {company.workingTime}
      </Descriptions.Item>
      <Descriptions.Item label="Email">{company.email}</Descriptions.Item>
      <Descriptions.Item label="Website">
        {" "}
        <a href="/"> {company.website} </a>{" "}
      </Descriptions.Item>
    </Descriptions>
  );

  const detailInfoCompany = (
    <>
      {company && (
        <>
          <div>
            {company.description &&
              company?.description.split("\n").map((item, key) => {
                if (key % 2 === 0) {
                  // Dòng chẵn: sử dụng <ul>
                  return (
                    <ul key={key} className="company__aim">
                      <li>{item}</li>
                    </ul>
                  );
                } else {
                  // Dòng lẽ: sử dụng <li>
                  return (
                    <li key={key} className="company__aim-li">
                      {item}
                    </li>
                  );
                }
              })}
          </div>
          <div className="company__details">
            <div className="box_head">
              <div className="title">
                Mục tiêu của chúng tôi trong tương lai
              </div>
            </div>
            <div className="title_inner">
              {/* Sử dụng <ul> cho phần detail */}
              {company.detail &&
                company.detail.split("\n").map((item, key) => (
                  <li key={key} className="company__aim-li">
                    {item}
                  </li>
                ))}
            </div>
            <div style={{ textAlign: "center", margin: "35px 0 0 10px" }}>
              <Button type="primary"> Join Us Now</Button>
            </div>
          </div>
        </>
      )}
    </>
  );

  const items = [
    {
      key: 1,
      label: "Giới thiệu chung",
      children: <> {infoCompany} </>,
    },
    {
      key: 2,
      label: "Why do you want to join us ?",
      children: <> {detailInfoCompany} </>,
    },
  ];

  return (
    <>
      {company && (
        <>
          <DrawingCompany company={company} />
          <div className="scroll">
            <Row>
              <Col xl={24}>
                <Tabs
                  tabPosition="left"
                  defaultActiveKey="2"
                  centered
                  items={items}
                  className="company__tabs"
                />
              </Col>
            </Row>
            <Row>
              <Col xl={12}>
                <div className="company__des">
                  <div className="container">
                    <div className="jobs_container">
                      {jobs &&
                        jobs[0]?.description
                          .split("\n")
                          .map((item, key) => <ul key={key}>{item}</ul>)}{" "}
                    </div>
                  </div>
                </div>
              </Col>
              <Col xl={12}>
                <div className="job_company__container">
                  <div className="inner-wrap-title">
                    {" "}
                    Top việc làm công ty đang tuyển dụng{" "}
                  </div>
                  <div className="job_company">
                    <div className="container">
                      <div className="inner-wrap">
                        {jobs && <DrawingJobs data={jobs} />}
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </>
      )}
    </>
  );
}
export default DetailCompany;
