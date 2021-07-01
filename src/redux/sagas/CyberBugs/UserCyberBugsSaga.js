import { call, delay, put, select, takeLatest } from "redux-saga/effects";
import { cyberBugsService } from "../../../services/CyberBugsService";
import { userService } from "../../../services/UserService";
import { TOKEN, USER_LOGIN } from "../../../utils/constants/settingSystem";
import {
    GET_ALL_PROJECT_SAGA,
    LOGIN_INFO,
    USER_SIGNIN_API,
} from "../../constants/CyberBugsConst";
import {
    DISPLAY_LOADING,
    HIDE_LOADING,
} from "../../constants/LoadingConstants";

// Sign in
function* signInSaga(action) {
    console.log(action);
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

export function* followSignIn() {
    yield takeLatest(USER_SIGNIN_API, signInSaga);
}

// Get the list of user using keyword
function* getUserSaga(action) {
    try {
        const { data, status } = yield call(() =>
            userService.getUser(action.keyword)
        );

        yield put({
            type: "GET_USER_SEARCH",
            listOfUser: data.content,
        });
    } catch (error) {
        console.log(error.response.data);
    }
}

export function* followGetUserSaga() {
    yield takeLatest("GET_USER_API", getUserSaga);
}

// Assign users to a project
function* addUserSaga(action) {
    try {
        const { data, status } = yield call(() =>
            userService.assignUserProject(action.userProject)
        );
        console.log("data", data);

        yield put({
            type: GET_ALL_PROJECT_SAGA,
        });
    } catch (error) {
        console.log(error.response.data);
    }
}

export function* followAddUserProjectSaga() {
    yield takeLatest("ADD_USER_PROJECT_API", addUserSaga);
}
