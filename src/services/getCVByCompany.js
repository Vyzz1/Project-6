import { Get } from "../utils/requestFirebase";

export const getCVByCompany = async (id) => {
  const response = await Get("cv");
  const result = response.filter(
    (job) => parseInt(job.idCompany) === parseInt(id)
  );
  if (result) {
    return result;
  }
};
