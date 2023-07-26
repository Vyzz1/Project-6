import { CreateService } from "../services/CreateService";
import { formatDateTime } from "../utils/formatDateTime";
export const createReducers = (state = [], action) => {
  switch (action.type) {
    case "CreateCV":
      let {
        city,
        description,
        email,
        id,
        idCompany,
        idJob,
        linkProject,
        name,
        phone,
      } = action.body;
      let newBody = {
        city: city,
        description: description,
        email: email,
        id: id,
        idCompany: idCompany,
        idJob: idJob,
        linkProject: linkProject,
        name: name,
        phone: phone,
        statusRead: false,
        createAt: formatDateTime(Date.now()),
      };
      CreateService("cv", newBody, action.length);
      return state;
    case "CreateJob":
      CreateService("jobs", action.body, action.length);
      return state;
    case "CreateCompany":
      CreateService("company", action.body, action.length);
      return state;
    default:
      return state;
  }
};
