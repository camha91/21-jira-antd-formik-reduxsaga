import Axios from "axios";
import { DOMAIN_CYBERBUGS } from "../utils/constants/settingSystem";

export const cyberBugsService = {
    signinCyberBugs: (userLogin) => {
        return Axios({
            url: `${DOMAIN_CYBERBUGS}/users/signin`,
            method: "POST",
            data: userLogin,
        });
    },
    getAllProjectCategory: () => {
        return Axios({
            url: `${DOMAIN_CYBERBUGS}/ProjectCategory`,
            method: "GET",
        });
    },
};
