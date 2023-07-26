import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getJobDetails } from "../../services/getJobDetails";
import { useState } from "react";
import { Button, Card, Tag } from "antd";
import Title from "antd/es/typography/Title";
import EditJob from "../../components/EditJob";
import { getCvByJobs } from "../../services/getCvByJobs";

function DetailJobsAdmin() {
  const { id } = useParams();
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const response = await getJobDetails(id);
      if (response) {
        setJobs(response[0]);
      }
    };
    fetch();
  }, [id]);
  const [cv, setCv] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const response = await getCvByJobs(id);
      if (response) {
        setCv(response);
      }
    };
    fetch();
  }, [id]);
  return (
    <>
      {jobs && (
        <>
          <Title> Jobs Details </Title>
          <EditJob items={jobs} />
          <h3> Tên: {jobs.name} </h3>
          <h3> Tags: </h3>
          <div className="jobs__tags">
            {jobs.tags?.map((tag, index) => (
              <Tag key={index} className="tag">
                {" "}
                {tag}{" "}
              </Tag>
            ))}
          </div>
          <h3>City: </h3>
          <div className="jobs__tags">
            {jobs.city?.map((city, index) => (
              <Tag key={index} className="tag" color="blue">
                {" "}
                {city}{" "}
              </Tag>
            ))}
          </div>
          <h4> Mức lương $ {jobs.salary} </h4>
          <h4> Thời gian đăng bài : {jobs.createAt} </h4>
          <h4>
            {" "}
            Thời gian cập nhật :{" "}
            {jobs.updateAt ? <> {jobs.updateAt}</> : <> Chưa cập nhât</>}{" "}
          </h4>
          <h4>
            Trạng thái:{" "}
            {jobs.status ? (
              <>
                <Button> Bật </Button>
              </>
            ) : (
              <>
                {" "}
                <Button>Tắt</Button>
              </>
            )}
          </h4>
          <Link to={`/admin/job/${id}/cv/`}>
            <h4>Số CV nộp : {cv?.length}</h4>
          </Link>

          {/*  */}
          <hr style={{ borderColor: "#437ae9" }} />
          {/*  */}
          <div style={{ margin: "15px 0" }}>
            <h3>Description</h3>
            <Card>{jobs.description}</Card>
          </div>
          <Link to={-1}>
            <Button
              style={{ position: "fixed", bottom: "20px", right: "10px" }}
            >
              {" "}
              Trờ về trang cấu hình jobs
            </Button>
          </Link>
        </>
      )}
    </>
  );
}
export default DetailJobsAdmin;
