export const formatDateTime = (milliseconds) => {
  let d = new Date(milliseconds);
  let day = d.getDate().toString().padStart(2, "0");
  let month = (d.getMonth() + 1).toString().padStart(2, "0");
  let year = d.getFullYear();
  let hours = d.getHours().toString().padStart(2, "0");
  let minutes = d.getMinutes().toString().padStart(2, "0");
  let seconds = d.getSeconds().toString().padStart(2, "0");

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
};
