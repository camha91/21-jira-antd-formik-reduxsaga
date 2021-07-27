import { USER_LOGIN } from "../../utils/constants/settingSystem";
import {
    EDIT_USER,
  GET_USER_PROJECT_BY_ID,
  GET_USER_SEARCH,
  LOGIN_INFO,
} from "../constants/UserCyberBugsConst";

let loginInfo = [];

if (localStorage.getItem(USER_LOGIN)) {
  loginInfo = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
  userLogin: loginInfo,
  userSearch: [],
  arrUsers: [],
  userEdit: {
      id: "175",
      passWord: "123456",
      email: "camha@gmail.com",
      name: "Camha Ng",
      phoneNumber: "7896780"
  },
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
    case GET_USER_PROJECT_BY_ID: {
      return { ...state, arrUser: action.arrUser };
    }
    case EDIT_USER: {
        return {...state, userEdit: action.userEditModel}
    }
    default:
      return { ...state };
  }
};

export default UserCyberBugsReducer;
