import { baseService } from "./baseService";

export class UserService extends baseService {
  constructor() {
    super();
  }

  getUser = (keyword) => {
    if (keyword) {
      return this.get(`Users/getUser?keyword=${keyword}`);
    }
    return this.get("Users/getUser");
  };

  assignUserProject = (userProject) => {
    return this.post("Project/assignUserProject", userProject);
  };

  removeUserProject = (userProject) => {
    return this.post("Project/removeUserFromProject", userProject);
  };

  getUserByProjectId = (idProject) => {
    return this.get(`Users/getUserByProjectId?idProject=${idProject}`);
  };

  editUser = (updateUser) => {
    return this.put("Users/editUser", updateUser);
  };

  deleteUser = (userId) => {
    return this.delete(`Users/deleteUser?id=${userId}`);
  };
}

export const userService = new UserService();
