import { all } from "redux-saga/effects";
import * as CyberBugs from "./CyberBugs/UserCyberBugsSaga";

export function* rootSaga() {
    yield all([CyberBugs.followSignIn()]);
}
