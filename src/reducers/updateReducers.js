import { updateData } from "../services/updateData";
export const updateReducers = (state = [], action) => {
  switch (action.type) {
    case "UPDATE": {
      updateData(action.path, action.body, action.id);
      return state;
    }
    default:
      return state;
  }
};
