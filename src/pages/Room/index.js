import { Button } from "antd";
import { Link } from "react-router-dom";
import RoomGrid from "./RoomGrid";
import { useEffect, useState } from "react";
import { getListRoom } from "../../services/roomsService";

function Room() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getListRoom();
      setRooms(response);
    }
    fetchApi();
  }, []);

  return (
    <>
      <h2>Quản lý phòng</h2>
      <Link to="/create-room">
        <Button>Tạo phòng</Button>
      </Link>

      {rooms && (
        <div className="mt-20">
          <RoomGrid rooms={rooms} />
        </div>
      )}
    </>
  )
}

export default Room;