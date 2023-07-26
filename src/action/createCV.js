export const createCV = (body, length) => {
  let data = { ...body, id: length + 1 };
  return {
    type: "CreateCV",
    body: data,
    length: length,
  };
};
