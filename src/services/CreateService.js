import { child, ref, set } from "firebase/database";
import { database } from "../firebase";
export const CreateService = async (path, body, length) => {
  const db = ref(database);
  set(child(db, `${path}/${length}`), body);
};
