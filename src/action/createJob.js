export const createJob = (body, length) => {
  let data = { ...body, id: length + 1 };

  return {
    type: "CreateJob",
    body: data,
    length: length,
  };
};
