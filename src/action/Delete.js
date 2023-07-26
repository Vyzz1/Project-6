export const Delete = (path, id) => {
  return {
    type: "DELETE",
    path: path,
    id: id,
  };
};
