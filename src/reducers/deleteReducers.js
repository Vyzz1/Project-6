import { DeleteService } from "../services/DeleteService";
export const deleteReducers = (state = [], action) => {
  switch (action.type) {
    case "DELETE":
      DeleteService(action.path, action.id);
      return state;

    default:
      return state;
  }
};
