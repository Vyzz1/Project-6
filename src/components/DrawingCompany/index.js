import { Button, Image, Rate, Row, Col } from "antd";
import { AiOutlinePlus } from "react-icons/ai";
import { IoLocateOutline } from "react-icons/io5";
import { SlPeople } from "react-icons/sl";
import { getRandomNumber } from "../../helpers/helpers";
import imageCompany from "../../images/hands-1063442_960_720.jpg";

function DrawingCompany({ company }) {
  let rate = getRandomNumber(3, 5);
  let quantity = getRandomNumber(10, 30);
  let percent = getRandomNumber(70, 100);
  return (
    <>
      <Row>
        <Col xl={24}>
          <div className="company">
            <div className="company__img">
              <Image src={imageCompany}></Image>
            </div>
            <div className="company__info">
              <div className="company__name"> {company.companyName}</div>
              <div className="company__inner">
                <IoLocateOutline className="icon_location" />
                <span className="company__address"> {company.address} </span>
                <SlPeople className="icon_location" />
                <span className="company__quantity">
                  {" "}
                  {company.quantityPeople} thành viên{" "}
                </span>
              </div>
              <Button
                icon={
                  <AiOutlinePlus
                    size="16px"
                    style={{ marginBottom: "-3px" }}
                    color="blue"
                  />
                }
              >
                {" "}
                Theo dõi{" "}
              </Button>
              <Button style={{ marginLeft: "15px" }} type="primary">
                {" "}
                Viết đánh giá{" "}
              </Button>
            </div>
            <div className="company__rate">
              <Rate disabled defaultValue={rate}></Rate>
              <div className="company__rate-quantity">
                {" "}
                <strong>{quantity}</strong> người đã đánh giá{" "}
              </div>
              <div className="company__rate-percent">
                <strong>{percent}%</strong> khuyến khích làm việc tại đây
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}
export default DrawingCompany;
