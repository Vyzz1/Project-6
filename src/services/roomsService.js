import { get, post } from "../utils/request";

export const createRoom = async (options) => {
  const response = await post("rooms", options);
  return response;
};

export const getListRoom = async () => {
  const response = await get("rooms");
  return response;
};