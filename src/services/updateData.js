import { child, ref, update } from "firebase/database";
import { database } from "../firebase";
export const updateData = async (path, body, id) => {
  const db = ref(database);

  update(child(db, `${path}/${id}`), body);
};
