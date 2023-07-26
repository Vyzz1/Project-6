import { Badge, Card, Col, Row } from "antd";

function RoomGrid(props) {
  const { rooms } = props;

  console.log(rooms);

  return (
    <>
      <Row gutter={[20, 20]}>
        {rooms.map((item) => (
          <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24} key={item.id}>
            <Badge.Ribbon
              color={item.type ? "purple" : "gray"}
              text={item.type ? "VIP" : "Thường"}
            >
              <Card title={item.name} size="small">
                <p>
                  Số giường: <strong>{item.quantityBed}</strong>
                </p>
                <p>
                  Số người tối đa: <strong>{item.quantityPeople}</strong>
                </p>
                <p>
                  <Badge
                    color={item.status ? "green" : "red"}
                    text={item.status ? "Còn phòng" : "Hết phòng"}
                  />
                </p>
                <p>
                  Kiểu phòng: <strong>{item.type}</strong>
                </p>
              </Card>
            </Badge.Ribbon>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default RoomGrid;
