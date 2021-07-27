import { call, delay, put, select, takeLatest } from "redux-saga/effects";
import { cyberBugsService } from "../../../services/CyberBugsService";
import { userService } from "../../../services/UserService";
import {
  STATUS_CODE,
  TOKEN,
  USER_LOGIN,
  USER_PROFILE,
} from "../../../utils/constants/settingSystem";
import { CLOSE_DRAWER } from "../../constants/DrawerCyberBugsConst";
import {
  DISPLAY_LOADING,
  HIDE_LOADING,
} from "../../constants/LoadingConstants";
import { GET_ALL_PROJECT_SAGA } from "../../constants/ProjectConst";
import {
  ADD_USER_PROJECT_API,
  GET_USER_API,
  GET_USER_PROJECT_BY_ID,
  GET_USER_PROJECT_BY_ID_API,
  GET_USER_SEARCH,
  LOGIN_INFO,
  REMOVE_USER_PROJECT_API,
  UPDATE_USER_SAGA,
  USER_SIGNIN_API,
  USER_SIGNUP_API,
} from "../../constants/UserCyberBugsConst";

// Sign in
function* signInSaga(action) {
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(300);

  try {
    const { data, status } = yield call(() =>
      cyberBugsService.signinCyberBugs(action.userLogin)
    );

    // Store in localStorage after sign in successfully
    localStorage.setItem(TOKEN, data.content.accessToken);
    localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));

    yield put({
      type: LOGIN_INFO,
      userLogin: data.content,
    });

    let history = yield select((state) => state.HistoryReducer.history);

    history.push("/home");
  } catch (error) {
    console.log(error.response.data);
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* trackingActionSignIn() {
  yield takeLatest(USER_SIGNIN_API, signInSaga);
}

// Sign up
function* signUpSaga(action) {
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(300);

  try {
    const { data, status } = yield call(() =>
      cyberBugsService.signupCyberBugs(action.userRegister)
    );
    console.log("dataRegister", data);

    // Store in localStorage after register successfully
    localStorage.setItem(USER_PROFILE, data.content);
    // localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));

    // yield put({
    //     type: LOGIN_INFO,
    //     userLogin: data.content,
    // });

    let history = yield select((state) => state.HistoryReducer.history);

    history.push("/login");
  } catch (error) {
    console.log(error.response.data);
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* trackingActionSignUp() {
  yield takeLatest(USER_SIGNUP_API, signUpSaga);
}

// Get the list of user using keyword
function* getUserSaga(action) {
  try {
    const { data, status } = yield call(() =>
      userService.getUser(action.keyword)
    );
    console.log("data", data);
    const listOfUserTransform = data.content.map((elem) => {
      return {
        id: elem.userId.toString(),
        passWord: '',
        email: elem.email,
        name: elem.name,
        phoneNumber: elem.phoneNumber.toString(),
      };
    });
    yield put({
      type: GET_USER_SEARCH,
      listOfUser: listOfUserTransform,
    });
  } catch (error) {
    console.log('error', error);
  }
}

export function* trackingActionGetUserSaga() {
  yield takeLatest(GET_USER_API, getUserSaga);
}

// Assign users to a project
function* addUserSaga(action) {
  try {
    const { data, status } = yield call(() =>
      userService.assignUserProject(action.userProject)
    );

    yield put({
      type: GET_ALL_PROJECT_SAGA,
    });
  } catch (error) {
    console.log(error.response.data);
  }
}

export function* trackingActionAddUserProjectSaga() {
  yield takeLatest(ADD_USER_PROJECT_API, addUserSaga);
}

// Remove users to a project
function* removeUserSaga(action) {
  try {
    const { data, status } = yield call(() =>
      userService.removeUserProject(action.userProject)
    );

    yield put({
      type: GET_ALL_PROJECT_SAGA,
    });
  } catch (error) {
    console.log(error.response.data);
  }
}

export function* trackingActionRemoveUserProjectSaga() {
  yield takeLatest(REMOVE_USER_PROJECT_API, removeUserSaga);
}

// Get user by projectId
function* getUserByProjectIdSaga(action) {
  const { idProject } = action;
  console.log("action", idProject);

  try {
    const { data, status } = yield call(() =>
      userService.getUserByProjectId(idProject)
    );
    console.log("checkData", data);

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_USER_PROJECT_BY_ID,
        arrUser: data.content,
      });
    }
  } catch (error) {
    console.log(error.response.data);
    if (error.response?.data.statusCode === STATUS_CODE.NOT_FOUND) {
      yield put({
        type: GET_USER_PROJECT_BY_ID,
        arrUser: [],
      });
    }
  }
}

export function* trackingActionGetUserByProjectIdSaga() {
  yield takeLatest(GET_USER_PROJECT_BY_ID_API, getUserByProjectIdSaga);
}

// Update user
function* updateUserSaga(action) {
  const { userUpdate } = action;
  console.log("action", userUpdate);

  try {
    const { data, status } = yield call(() => userService.editUser(userUpdate));
    console.log("checkData", data);

    if (status === STATUS_CODE.SUCCESS) {
      yield put({type: GET_USER_API, keyword: ''});
      yield put({type: CLOSE_DRAWER});
    }
  } catch (error) {
    console.log(error.response.data);
  }
}

export function* trackingActionUpdateUserSaga() {
  yield takeLatest(UPDATE_USER_SAGA, updateUserSaga);
}

const userTrackingActionList = [
  trackingActionSignIn(),
  trackingActionSignUp(),
  trackingActionGetUserSaga(),
  trackingActionAddUserProjectSaga(),
  trackingActionRemoveUserProjectSaga(),
  trackingActionGetUserByProjectIdSaga(),
  trackingActionUpdateUserSaga(),
];

export default userTrackingActionList;
