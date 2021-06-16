import Axios from "axios";
import { USER_SIGNIN_API } from "../../constants/CyberBugsConst";
import { delay, put, takeLatest } from "redux-saga/effects";
import { cyberBugsService } from "../../../services/CyberBugsService";
import {
    DISPLAY_LOADING,
    HIDE_LOADING,
} from "../../constants/LoadingConstants";
import { TOKEN, USER_LOGIN } from "../../../utils/constants/settingSystem";

function* signInSaga(action) {
    console.log(action);
    yield put({
        type: DISPLAY_LOADING,
    });
    yield delay(500);

    try {
        const { data, status } = yield cyberBugsService.signinCyberBugs(
            action.userLogin
        );

        // Store in localStorage after sign in successfully
        localStorage.setItem(TOKEN, data.content.accessToken);
        localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));

        console.log(data);
        yield put({
            type: HIDE_LOADING,
        });
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
