import { all } from "redux-saga/effects";
import * as CyberBugs from "./CyberBugs/UserCyberBugsSaga";
import * as ProjectCategory from "./CyberBugs/ProjectCategorySaga";

export function* rootSaga() {
    yield all([
        CyberBugs.followSignIn(),
        ProjectCategory.followGetAllProjectCategory(),
    ]);
}
