import { Descriptions } from "antd";

function DrawingGeneralInfo({ company }) {
  return (
    <>
      {company && (
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
          <Descriptions.Item label="Email">{company.email}</Descriptions.Item>
          <Descriptions.Item label="Website">
            {" "}
            <a href="/"> {company.website} </a>{" "}
          </Descriptions.Item>
          <Descriptions.Item label="Số lượng nhân viên">
            {" "}
            {company.quantityPeople}
          </Descriptions.Item>
          <Descriptions.Item label="Link ảnh">
            {" "}
            http://localhost:3000/static/media/hands-1063442_960_720.17cc6fdb118305fab06e.jpg
          </Descriptions.Item>
        </Descriptions>
      )}
    </>
  );
}
export default DrawingGeneralInfo;
