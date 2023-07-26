import { child, get, ref } from "firebase/database";
import { database } from "../firebase";
export const Get = async (path) => {
  const dbRef = ref(database);
  const snapshot = await get(child(dbRef, path));
  const response = await snapshot.val();

  if (snapshot.exists()) {
    return response;
  }
};
