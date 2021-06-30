import Axios from "axios";
import { DOMAIN_CYBERBUGS, TOKEN } from "../utils/constants/settingSystem";

export class baseService {
    // put json to backend
    put = (url, model) => {
        return Axios({
            url: `${DOMAIN_CYBERBUGS}/${url}`,
            method: "PUT",
            data: model,
            headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
        });
    };
    post = (url, model) => {
        return Axios({
            url: `${DOMAIN_CYBERBUGS}/${url}`,
            method: "POST",
            data: model,
            headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
        });
    };
    get = (url) => {
        return Axios({
            url: `${DOMAIN_CYBERBUGS}/${url}`,
            method: "GET",
            headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
        });
    };
    delete = (url) => {
        return Axios({
            url: `${DOMAIN_CYBERBUGS}/${url}`,
            method: "DELETE",
            headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
        });
    };
}
