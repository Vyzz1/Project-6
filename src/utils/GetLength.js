import { child, get, ref } from "firebase/database";
import { database } from "../firebase";

export const GetLength = async (path) => {
  const dbRef = ref(database);
  const snapshot = await get(child(dbRef, `${path}`));
  const response = await snapshot.val();
  return response.length;
};
