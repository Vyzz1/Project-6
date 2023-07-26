export const createCompany = (body, length) => {
  let data = { ...body, id: length + 1 };

  return {
    type: "CreateCompany",
    body: data,
    length: length,
  };
};
