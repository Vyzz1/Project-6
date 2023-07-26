export const update = (path, body, id) => {
  return {
    type: "UPDATE",
    path: path,
    body: body,
    id: id,
  };
};
