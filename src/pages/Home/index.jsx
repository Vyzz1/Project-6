import {
  Button,
  Col,
  Form,
  Input,
  Rate,
  Row,
  Select,
  Tag,
  notification,
} from "antd";
import React, { useEffect, useState } from "react";
import { Get } from "../../utils/requestFirebase";
import "./Home.scss";
import { getRandomItemsFromArray } from "../../helpers/helpers";
import { color } from "../../utils/color";
import { AiOutlineArrowRight, AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function Home() {
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
  const [tags, setTags] = useState([]);

  const [newArrayLength, setNewArrayLength] = useState(6);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", updateWindowWidth);

    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, []); // The empty dependency array ensures that the effect runs only once after the initial render

  useEffect(() => {
    if (windowWidth < 500) {
      setNewArrayLength(4);
    } else {
      setNewArrayLength(6);
    }
  }, [windowWidth]);

  var randomTags = [];
  useEffect(() => {
    const fetch = async () => {
      const response = await Get("tags");

      if (response) {
        setTags(response);
      }
    };
    fetch();
  }, []);
  const [company, setCompany] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const response = await Get("company");
      if (response) {
        setCompany(response);
      }
    };
    fetch();
  }, []);

  let optCity = [];
  for (let i = 0; i < city.length; i++) {
    optCity.push({
      value: city[i].value,
      label: city[i].value,
    });
  }
  const navigate = useNavigate();
  const Context = React.createContext({
    name: "Default",
  });
  const [api, contextHolder] = notification.useNotification();
  const openNotification = () => {
    api["warning"]({
      message: "Vui nhập thông tin để tìm kiếm",
      placement: "topRight",
    });
  };

  const handleFinish = (e) => {
    console.log(e);
    let searching = e.searching;
    let city = e.city;
    if (city == null || city === "Tất cả thành phố") {
      city = "all";
    }
    if (searching == undefined) {
      searching = "all";
    }

    if (searching === "all" && city[0] === "Tất cả thành phố") {
      openNotification();

      return;
    }
    navigate(`/search/${city}/${searching}`);
  };
  const handleOnClick = (e) => {
    let tag = e.toLowerCase();
    navigate(`/search/all/${tag}`);
  };
  randomTags = getRandomItemsFromArray(tags, newArrayLength);
  let randomColors = getRandomItemsFromArray(color, newArrayLength);
  const handleOnClickCompany = (e) => {
    let idCompany = e;
    navigate(`/company/${idCompany}`);
  };
  const contextValue = {
    defaultValue: "default",
  };
  return (
    <>
      <h2 style={{ textAlign: "center" }}>Trang chủ</h2>
      <Context.Provider value={contextValue}>
        {contextHolder}
        <Form onFinish={handleFinish}>
          <Row justify="center" gutter={[10, 10]}>
            <Col xl={6} xs={24}>
              <Form.Item
                name="city"
                rules={[{ required: false }]}
                initialValue={["Tất cả thành phố"]}
              >
                <Select allowClear options={optCity} size="large" />
              </Form.Item>
            </Col>
            <Col xl={12} sm={24} xs={24}>
              <Form.Item
                className="input"
                name="searching"
                rules={[{ required: false }]}
              >
                <Input
                  size="large"
                  style={{ width: "100%" }}
                  value="input"
                  placeholder="Nhập từ khóa theo kỹ năng, chức vụ, công ty,..."
                ></Input>
              </Form.Item>
            </Col>
            <Col xl={6}>
              <Form.Item>
                <Button
                  htmlType="submit"
                  type="primary"
                  size="large"
                  style={{ width: "100%" }}
                >
                  Tìm kiếm
                </Button>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Item>
                <div style={{ display: "flex" }}>
                  <span> Gợi ý cho bạn :</span>
                  <div
                    style={{
                      marginLeft: "10px",
                    }}
                  >
                    {tags.length > 0 && (
                      <>
                        {" "}
                        {randomTags.map((tag, index) => (
                          <Tag
                            key={index + 1}
                            color={randomColors[index]}
                            onClick={() => handleOnClick(tag.value)}
                            className="tag"
                          >
                            {" "}
                            {tag.value}{" "}
                          </Tag>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Context.Provider>
      <div className="box_head">
        <div className="title"> Top Công Ty Cho Bạn</div>
      </div>
      <Row gutter={[10, 20]}>
        {company.length > 0 &&
          company.map((value, key) => (
            <Col xl={8} key={key + 1} sm={12} xs={12}>
              <div
                className="boxCompany"
                onClick={() => handleOnClickCompany(value.id)}
                key={value.id}
              >
                <div className="boxCompany__wrap">
                  <div className="boxCompany__inner">
                    <div className="boxCompany__name">{value.companyName}</div>
                    <div className="boxCompany__address">{value.address}</div>
                  </div>
                  <div className="boxCompany__rate">
                    <Rate
                      disabled
                      defaultValue={Math.floor(Math.random() * 3) + 3}
                    />
                  </div>
                  <div className="boxCompany__inner1">
                    <div className="boxCompany__quantity">
                      {" "}
                      {value.quantityPeople} việc làm đang chờ{" "}
                      <AiOutlineArrowRight
                        size="16px"
                        style={{ marginBottom: "-3px" }}
                        color="blue"
                      />
                    </div>
                  </div>
                </div>
                <div className="boxCompany__button">
                  <Button icon={<AiOutlinePlus />}> Theo dõi </Button>
                </div>
              </div>
            </Col>
          ))}
      </Row>
    </>
  );
}
export default Home;
