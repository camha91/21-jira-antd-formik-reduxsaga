import { baseService } from "./baseService";

export class UserService extends baseService {
    constructor() {
        super();
    }

    getUser = (keyword) => {
        return this.get(`Users/getUser?keyword=${keyword}`);
    };
}

export const userService = new UserService();
