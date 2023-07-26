import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  message,
} from "antd";
import { GetCookie } from "../../GetCookie";
import { getCompanyDetails } from "../../services/getCompanyDetails";
import { useEffect } from "react";
import { useState } from "react";
import DrawingGeneralInfo from "../../components/DrawingGeneralnfo";
import { deepEqual } from "../../helpers/helpers";
import { useDispatch } from "react-redux";
import { update } from "../../action/update";
import { useNavigate } from "react-router-dom";
function SettingCompany() {
  const id = JSON.parse(GetCookie("info")).id;
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
  const [openInfoGenaral, setOpenInfoGenaral] = useState(false);
  const [openInfoDetail, setOpenInfoDetail] = useState(false);
  const showModal = () => {
    setOpenInfoGenaral(true);
  };
  const showModalDetail = () => {
    setOpenInfoDetail(true);
  };
  const handleCancel = () => {
    setOpenInfoGenaral(false);
    setOpenInfoDetail(false);
  };
  const style = {
    marginBottom: "8px",
    marginLeft: "15px",
    fontWeight: "350",
    color: "#141515",
    fontSize: "18px ",
  };
  let obj1 = {
    address: company?.address,
    companyName: company?.companyName,
    email: company?.email,
    phone: company?.phone,
    quantityPeople: company?.quantityPeople,
    website: company?.website,
    workingTime: company?.workingTime,
  };
  let obj2 = {
    description: company?.description,
    detail: company?.detail,
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleFinish = function (e) {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenInfoDetail(false);
      setOpenInfoGenaral(false);
      setTimeout(() => {
        if (deepEqual(e, obj1) || deepEqual(e, obj2)) {
          message.warning("Nothing changed");
        } else {
          dispatch(update("company", e, id - 1));
          message.success("Sửa thành công");
          setTimeout(() => {
            navigate(0);
          }, 600);
        }
      }, 500);
    }, 2000);
  };
  const [loading, setLoading] = useState(false);
  return (
    <>
      {/* Box 1 */}
      <div className="company_general_info" style={{ marginBottom: "45px" }}>
        <div>
          <div className="box_head">
            <div className="title">Thông tin chung</div>
          </div>
          <Row gutter={[20, 20]}>
            <Col
              xl={{
                span: 18,
                offset: 3,
              }}
              xs={{
                span: 24,
                offset: 0,
              }}
              sm={{
                span: 24,
                offset: 0,
              }}
            >
              <div className="card">
                <DrawingGeneralInfo company={company} />
              </div>
              <div style={{ margin: "25px 0", textAlign: "center" }}>
                <Button type="primary" onClick={showModal}>
                  {" "}
                  Sửa thông tin
                </Button>
              </div>
            </Col>
          </Row>

          {/* Modal */}

          <Modal
            centered
            title="Sửa thông tin"
            open={openInfoGenaral}
            footer={null}
            onCancel={handleCancel}
          >
            {/* Form */}

            <Form initialValues={company} onFinish={handleFinish}>
              <Form.Item label="Tên công ty" name="companyName">
                <Input />
              </Form.Item>
              <Form.Item label="Telephone" name="phone">
                <Input />
              </Form.Item>
              <Form.Item label="Địa chỉ" name="address">
                <Input />
              </Form.Item>
              <Form.Item label="Giờ làm việc" name="workingTime">
                <Input />
              </Form.Item>
              <Form.Item label="Email" name="email">
                <Input />
              </Form.Item>
              <Form.Item label="Website" name="website">
                <Input />
              </Form.Item>
              <Form.Item label="Số lượng nhân viên" name="quantityPeople">
                <InputNumber min={1} />
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
                  {" "}
                  Sửa thông tin{" "}
                </Button>
              </div>
            </Form>
          </Modal>
          {/* End Modal */}
        </div>
      </div>

      {/* End Box 1 */}

      {/* Box 2 */}
      <div className="box_head">
        <div className="title">Giới thiệu công ty</div>
      </div>
      <Row gutter={[20, 20]}>
        <Col xl={24}>
          <div
            className="box_wrap"
            style={{
              padding: "10px 20px ",
              marginTop: "15px",
              border: "1px solid blue",
            }}
          >
            <div style={{ marginLeft: "25px" }}>
              {company.description &&
                company.description.split("\n").map((item, key) => (
                  <p style={style} key={key + 1}>
                    {item}{" "}
                  </p>
                ))}
            </div>
            <div className="company__details">
              <div className="box_head">
                <div className="title">
                  Mục tiêu của chúng tôi trong tương lai
                </div>
              </div>
              <div className="title_inner">
                {company.detail &&
                  company.detail.split("\n").map((item, key) => (
                    <li key={key + 1} className="company__aim-li">
                      {item}
                    </li>
                  ))}
              </div>
            </div>
            <div style={{ marginTop: "25px", textAlign: "center" }}>
              <Button type="primary" onClick={showModalDetail}>
                {" "}
                Sửa thông tin
              </Button>
            </div>

            {/* Modal */}

            <Modal
              title="Sửa thông tin"
              open={openInfoDetail}
              onCancel={handleCancel}
              footer={null}
              centered
            >
              {/*  Form */}
              <Form initialValues={company} onFinish={handleFinish}>
                <Form.Item label="Giới thiệu chung" name="description">
                  <Input.TextArea
                    style={{
                      height: 200,
                      marginBottom: 24,
                      fontSize: "17px",
                    }}
                    showCount
                  />
                </Form.Item>
                <Form.Item label="Giới thiệu chi tiết" name="detail">
                  <Input.TextArea
                    style={{
                      height: 200,
                      marginBottom: 24,
                      fontSize: "17px",
                    }}
                    showCount
                  />
                </Form.Item>
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
                    {" "}
                    Sửa thông tin{" "}
                  </Button>
                </div>
              </Form>
              {/* /* End Form */}
            </Modal>

            {/*End Modal */}
          </div>
        </Col>
      </Row>
      {/* End box 2 */}
    </>
  );
}
export default SettingCompany;
