import { USER_LOGIN } from "../../utils/constants/settingSystem";
import { LOGIN_INFO } from "../constants/CyberBugsConst";

let loginInfo = [];

if (localStorage.getItem(USER_LOGIN)) {
    loginInfo = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
    userLogin: loginInfo,
};

const UserLoginCyberBugsReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case LOGIN_INFO: {
            state.userLogin = action.userLogin;
            return { ...state };
        }
        default:
            return { ...state };
    }
};

export default UserLoginCyberBugsReducer;
