import { Col, Row } from "antd";

function LearnGrid() {
  return (
    <>
      <Row gutter={[20, 10]}>
        <Col xxl={12} xl={8} lg={6} md={6} sm={12} xs={24}>
          <div className="box">
            Box 1
          </div>
        </Col>
        <Col xxl={12} xl={8} lg={6} md={6} sm={12} xs={24}>
          <div className="box">
            Box 2
          </div>
        </Col>
        <Col xxl={12} xl={8} lg={6} md={6} sm={12} xs={24}>
          <div className="box">
            Box 3
          </div>
        </Col>
        <Col xxl={12} xl={8} lg={6} md={6} sm={12} xs={24}>
          <div className="box">
            Box 4
          </div>
        </Col>
      </Row>
    </>
  )
}

export default LearnGrid;