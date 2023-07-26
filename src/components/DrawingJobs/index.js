import { Button, Tag, Badge } from "antd";
import "./DrawingJobs.scss";
import { IoLocationOutline } from "react-icons/io5";
import { getRandomItemsFromArray } from "../../helpers/helpers";
import { color } from "../../utils/color";
import Page404 from "../Page404";
import { useNavigate } from "react-router-dom";

function DrawingJobs({ data }) {
  const navigate = useNavigate();
  const handleBackHome = () => {
    navigate("/");
  };
  let randomColors = getRandomItemsFromArray(color, 2);
  const handleOnClick = function (id) {
    navigate("/jobs/" + id);
  };

  return (
    <>
      {data.length > 0 ? (
        <>
          {" "}
          {data.map((value, key) => (
            <Badge.Ribbon
              text="Hot!!"
              color="red"
              className="ribbon"
              key={key + 1}
            >
              <div
                className="jobs"
                key={value.id}
                onClick={() => handleOnClick(value.id)}
              >
                <div className="jobs__inner">
                  <div className="jobs__time">
                    {" "}
                    Cập nhật lúc {value.updateAt}
                  </div>
                  <div className="jobs__name">{value.name}</div>
                  <div className="jobs__salary">
                    Up to $ <span>{value.salary}</span>
                  </div>
                  <div className="jobs__location">
                    <IoLocationOutline className="icon_location" />
                    {Array.isArray(value.city) ? (
                      <span className="span_city">
                        {value.city.join(" - ")}
                      </span>
                    ) : (
                      <span className="span_city">{value.city}</span>
                    )}
                  </div>

                  <div className="jobs__tags">
                    {value.tags.map((tag, index) => (
                      <Tag
                        key={index + 1}
                        color={randomColors[index]}
                        className="tag"
                      >
                        {tag}
                      </Tag>
                    ))}
                  </div>
                </div>
                <div className="button__jobs">
                  <Button> Ứng tuyển ngay + </Button>
                </div>
              </div>
            </Badge.Ribbon>
          ))}
        </>
      ) : (
        <>
          <Page404 handleBackHome={handleBackHome} />{" "}
        </>
      )}
    </>
  );
}
export default DrawingJobs;
