import { combineReducers } from "redux";
import { updateReducers } from "./updateReducers";
import { createReducers } from "./createReducers";
import { deleteReducers } from "./deleteReducers";
const allReducers = combineReducers({
  //reducers
  updateReducers,
  createReducers,
  deleteReducers,
});
export default allReducers;
