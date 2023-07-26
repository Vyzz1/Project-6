import { child, ref, remove } from "firebase/database";
import { database } from "../firebase";
export const DeleteService = async (path, id) => {
  const db = ref(database);
  remove(child(db, `${path}/${id}`));
};
