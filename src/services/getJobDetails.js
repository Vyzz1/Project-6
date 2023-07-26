import { Get } from "../utils/requestFirebase";

export const getJobDetails = async (id) => {
  const response = await Get("jobs");
  const result = response.filter((job) => parseInt(job.id) === parseInt(id));
  if (result) {
    return result;
  }
};
