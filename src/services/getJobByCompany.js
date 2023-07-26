import { Get } from "../utils/requestFirebase";

export const getJobByCompany = async (id, type) => {
  const respone = await Get("jobs");
  const result = respone.filter(
    (job) => parseInt(job.idCompany) === parseInt(id)
  );
  if (type === 1) return result;
  if (type === 2) return result.filter((job) => job.status === true);
};
