import { USER_LOGIN } from "../../utils/constants/settingSystem";
import { GET_USER_SEARCH, LOGIN_INFO } from "../constants/UserCyberBugsConst";

let loginInfo = [];

if (localStorage.getItem(USER_LOGIN)) {
    loginInfo = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
    userLogin: loginInfo,
    userSearch: [],
};

const UserCyberBugsReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case LOGIN_INFO: {
            state.userLogin = action.userLogin;
            return { ...state };
        }
        case GET_USER_SEARCH: {
            state.userSearch = action.listOfUser;
            return { ...state };
        }
        default:
            return { ...state };
    }
};

export default UserCyberBugsReducer;
