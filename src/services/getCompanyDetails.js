import { Get } from "../utils/requestFirebase";

export const getCompanyDetails = async (id) => {
  const response = await Get("company");
  const result = response.filter(
    (company) => parseInt(company.id) === parseInt(id)
  );
  if (result) {
    return result;
  }
};
