import { Get } from "../utils/requestFirebase";

export const getCvByJobs = async (id) => {
  const response = await Get("cv");
  const result = response.filter((job) => parseInt(job.idJob) === parseInt(id));
  if (result) {
    return result;
  }
};
