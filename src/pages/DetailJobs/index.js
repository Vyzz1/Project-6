import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getJobDetails } from "../../services/getJobDetails";
import {
  Button,
  Col,
  Row,
  Tag,
  Image,
  Descriptions,
  Form,
  Input,
  message,
  InputNumber,
} from "antd";
import { IoLocationOutline } from "react-icons/io5";
import { getCompanyDetails } from "../../services/getCompanyDetails";
import ReactCountryFlag from "react-country-flag";
import { color } from "../../utils/color";
import { getRandomItemsFromArray } from "../../helpers/helpers";
import "./DetailJobs.scss";
import imageCompany from "../../images/hands-1063442_960_720.jpg";
import { GetLength } from "../../utils/GetLength";
import { TbWorldWww } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { createCV } from "../../action/createCV";
function DetailJobs() {
  const { id } = useParams();
  const [data, setData] = useState({});
  useEffect(() => {
    const fetch = async () => {
      const response = await getJobDetails(id);
      if (response) {
        setData(response[0]);
      }
    };
    fetch();
  }, [id]);
  const [company, setCompany] = useState([]);

  useEffect(() => {
    if (data) {
      const fetch = async () => {
        const response = await getCompanyDetails(data.idCompany);
        if (response) {
          setCompany(response[0]);
        }
      };
      fetch();
    }
  }, [data.idCompany, data]);
  let randomColors = getRandomItemsFromArray(color, 5);
  let infoCompany;
  let span = 2;
  let idJob = parseInt(id);

  if (company) {
    infoCompany = (
      <Descriptions layout="vertical">
        <Descriptions.Item label="Telephone" span={span}>
          {company.phone}
        </Descriptions.Item>
        <Descriptions.Item label="Địa chỉ">{company.address}</Descriptions.Item>
        <Descriptions.Item label="Giờ làm việc" span={span}>
          {company.workingTime}
        </Descriptions.Item>
        <Descriptions.Item label="Email">{company.email}</Descriptions.Item>
      </Descriptions>
    );
  }
  const [length, setLength] = useState(null);
  useEffect(() => {
    const fetch = async () => {
      const response = await GetLength("cv");
      if (response) {
        setLength(response);
      }
    };
    fetch();
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [num, setNum] = useState(0);
  const handleVisit = function (id) {
    navigate("/company/" + id);
  };
  const handleOnChange = (e) => {
    setNum(e);
  };
  const formRef = useRef(null);
  const handleApplyNow = () => {
    // Scroll đến phần tử form
    formRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const hanldeFinish = (body) => {
    let linkProject = [];
    if (body.project > 0) {
      for (let i = 0; i < body.project; i++) {
        linkProject.push(body[`project_num_${i}`]);
      }
    }
    let data = {
      ...body,
      idJob: idJob,
      idCompany: company?.id,
      linkProject: linkProject,
    };

    dispatch(createCV(data, length));
    setTimeout(() => {
      message.success("Gửi thành công");
      setTimeout(() => {
        navigate(0);
      }, 400);
    }, 1500);
  };

  return (
    <>
      {data && (
        <Row gutter={[20, 20]}>
          <Col xl={16} xs={24}>
            <div className="box1">
              <div className="jobs_detail">
                <div className="jobs_detail__container">
                  <h3> {data.name} </h3>
                  <div className="jobs_detail__location">
                    <IoLocationOutline className="icon_location" />
                    {Array.isArray(data.city) ? (
                      <span className="span_city">{data.city.join(" - ")}</span>
                    ) : (
                      <span className="span_city">{data.city}</span>
                    )}
                  </div>
                  <div className="jobs__salary">
                    Up to $ <span>{data.salary}</span>
                  </div>
                  <div className="jobs_detail_button">
                    <Button
                      type="primary"
                      size="large"
                      onClick={handleApplyNow}
                    >
                      {" "}
                      Ứng tuyển ngay{" "}
                    </Button>
                  </div>
                </div>
              </div>
              <div className="jobs-company">
                <div className="jobs-company__container">
                  <div className="jobs-company__location">
                    <IoLocationOutline className="icon_location" />
                    {company && <span> {company.address} </span>}
                  </div>
                  <div className="jobs-company__nation">
                    <ReactCountryFlag countryCode="VN" svg />
                    <span> Việt Nam</span>
                  </div>
                  <div className="jobs-company__posted">
                    {" "}
                    Posted in {data.createAt}
                  </div>
                  <div className="jobs-company__skills">
                    <span> Skill required : </span>
                    {data && data.tags ? (
                      data.tags.map((tag, index) => (
                        <Tag
                          key={index}
                          color={randomColors[index]}
                          className="tag"
                        >
                          {tag}
                        </Tag>
                      ))
                    ) : (
                      <span>No skills available.</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="jobs__info">
                {data && data.description ? (
                  data.description
                    .split("\n")
                    .map((item, key) => <p key={key}>{item}</p>)
                ) : (
                  <p>Loading description...</p>
                )}
              </div>
            </div>
          </Col>
          <Col xl={8} xs={24}>
            {company ? (
              <>
                {" "}
                <div className="box2">
                  <div className="company">
                    <Row>
                      <div className="company__img">
                        <Image src={imageCompany} />
                      </div>
                      <div className="company__wrapper">
                        <div className="company__name">
                          {company.companyName}
                        </div>
                        <Button onClick={() => handleVisit(company.id)}>
                          {" "}
                          Visit us now
                        </Button>
                      </div>
                    </Row>

                    <div className="company__website">
                      <TbWorldWww className="company__website-icon" />
                      <span> Our Website </span>
                    </div>

                    <hr></hr>
                    <Row>
                      <div className="company__info">{infoCompany}</div>
                    </Row>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </Col>
        </Row>
      )}
      <Row>
        <Col
          xl={{ span: 12, offset: 6 }}
          sm={{ span: 24, offset: 0 }}
          xs={{ span: 24, offset: 0 }}
        >
          <Form onFinish={hanldeFinish}>
            <h2 ref={formRef}> Điền thông tin ứng tuyển </h2>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                },
              ]}
              label="Your Name"
            >
              <Input placeholder="Type your name" size="large"></Input>
            </Form.Item>
            <Form.Item
              name="city"
              rules={[
                {
                  required: true,
                  message: "Please input your city!",
                },
              ]}
              label="Thành phố"
            >
              <Input placeholder="Type your city" size="large"></Input>
            </Form.Item>
            <Form.Item
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please input your phone!",
                },
              ]}
              label="Telephone"
            >
              <Input placeholder="Type your phone" size="large"></Input>
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
              label="Your Email"
            >
              <Input
                type="email"
                placeholder="Type your email"
                size="large"
              ></Input>
            </Form.Item>
            <Form.Item
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
              label="Self-Introduction"
            >
              <Input.TextArea type="email" size="large"></Input.TextArea>
            </Form.Item>
            <Form.Item
              label="Số project đã làm"
              rules={[
                {
                  required: true,
                  message: "Please input your project",
                },
              ]}
              name="project"
              initialValue={0}
            >
              <InputNumber min={0} onChange={handleOnChange}></InputNumber>
            </Form.Item>
            {num > 0 &&
              Array(num)
                .fill(null)
                .map((_, index) => (
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: "Please input your project",
                      },
                    ]}
                    name={`project_num_${index}`}
                    key={index}
                  >
                    <Input
                      addonBefore="https://"
                      placeholder="Enter your project link"
                    ></Input>
                  </Form.Item>
                ))}
            <div className="jobs_aplly">
              <Button type="primary" htmlType="submit">
                {" "}
                Ứng tuyển
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </>
  );
}
export default DetailJobs;
