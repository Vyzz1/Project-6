import { Get } from "../utils/requestFirebase";

export const getCvDetails = async (id) => {
  const response = await Get("cv");
  const result = response.filter((job) => parseInt(job.id) === parseInt(id));
  if (result) {
    return result;
  }
};
