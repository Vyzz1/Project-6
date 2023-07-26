import { Checkbox, Col, DatePicker, Input, Radio, Row, Select } from "antd";
import { useState } from "react";
const { RangePicker } = DatePicker;

function BookRoom() {
  const [date, setDate] = useState();
  const [time, setTime] = useState();

  const optionsTime = []

  for(let i = 7; i <= 23; i++) {
    optionsTime.push({
      value: i + "h",
      label: i + " giờ",
    });
  }

  const handleChangeDate = (_, dateString) => {
    setDate(dateString);
  };

  const handleChangeTime = (value) => {
    setTime(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    const fullName = e.target.elements.full_name.value;
    const phone = e.target.elements.phone.value;
    const email = e.target.elements.email.value;

    const services = e.target.elements.services;
    const arrayServices = [];

    for (let i = 0; i < services.length; i++) {
      if (services[i].checked === true) {
        arrayServices.push(services[i].value);
      }
    }

    const gift = e.target.elements.gift.value;

    const options = {
      full_name: fullName,
      phone: phone,
      email: email,
      services: arrayServices,
      gift: gift,
      date: date,
      time: time
    };

    console.log(options);
  };

  return (
    <>
      <h2>Đặt phòng</h2>
      <form onSubmit={handleSubmit}>
        <Row gutter={[10, 10]}>
          <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
            <p>Họ tên:</p>
            <Input name="full_name" placeholder="Ví dụ: Lê Văn A" required />
          </Col>
          <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
            <p>Số điện thoại:</p>
            <Input name="phone" placeholder="Ví dụ: 0123456789" required />
          </Col>
          <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
            <p>Email:</p>
            <Input
              name="email"
              placeholder="Ví dụ: levana@gmail.com"
              required
            />
          </Col>
          <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
            <p>Chọn ngày đặt phòng:</p>
            <RangePicker
              className="w-100"
              format="DD/MM/YYYY"
              onChange={handleChangeDate}
              placeholder={["Ngày nhận phòng", "Ngày trả phòng"]}
            />
          </Col>
          <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
            <p>Chọn giờ nhận phòng:</p>
            <Select
              name="time"
              className="w-100"
              options={optionsTime}
              onChange={handleChangeTime}
            />
          </Col>
          <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
            <p>Dịch vụ thêm:</p>
            <Checkbox.Group name="services">
              <Checkbox value="Thuê xe máy">Thuê xe máy</Checkbox>
              <Checkbox value="Thuê ô tô 4 chỗ">Thuê ô tô 4 chỗ</Checkbox>
              <Checkbox value="Thuê ô tô 7 chỗ">Thuê ô tô 7 chỗ</Checkbox>
              <Checkbox value="Thuê ô tô 16 chỗ">Thuê ô tô 16 chỗ</Checkbox>
            </Checkbox.Group>
          </Col>
          <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
            <p>Quà tặng:</p>
            <Radio.Group name="gift">
              <Radio value="Mũ">Mũ</Radio>
              <Radio value="Áo đôi">Áo đôi</Radio>
              <Radio value="Kem chống nắng">Kem chống nắng</Radio>
            </Radio.Group>
          </Col>
          <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
            <button type="submit">Đặt phòng</button>
          </Col>
        </Row>
      </form>
    </>
  );
}

export default BookRoom;
