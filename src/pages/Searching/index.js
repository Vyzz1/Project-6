import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchService } from "../../services/searchService";
import DrawingJobs from "../../components/DrawingJobs";
import { Col, Row } from "antd";
function Searching() {
  const params = useParams();
  const [data, setData] = useState();
  if (params.city === "Tất cả thành phố") params.city = "all";
  useEffect(() => {
    const fetch = async () => {
      const response = await searchService(params.text, params.city, "");
      if (response) {
        setData(response);
      }
    };
    fetch();
  }, [params.text, params.city]);
  let title1 = "";
  let title2 = "";
  if (params.text !== "all") {
    title1 = params.text.toUpperCase();
  }
  if (params.city !== "all") {
    title2 = params.city.toLocaleUpperCase();
  }
  let title = "";
  title = `TOP CÔNG VIỆC ${title1} CHO BẠN TẠI ${title2}`;
  if (params.city === "all") {
    title = `TOP CÔNG VIỆC ${title1}`;
  }
  title = title.replace("  ", " ");
  return (
    <>
      <div className="box_head">
        <div className="title">{title}</div>
        <div className="subtitle">Lorem ipsum dolor sit amet, consectetur</div>
      </div>

      {data && (
        <Row>
          {" "}
          <Col xl={{ span: 10, offset: 7 }} xs={{ span: 24 }}>
            {" "}
            <DrawingJobs data={data} />
          </Col>
        </Row>
      )}
    </>
  );
}
export default Searching;
