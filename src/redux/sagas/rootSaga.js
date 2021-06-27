import { all } from "redux-saga/effects";
import * as CyberBugs from "./CyberBugs/UserCyberBugsSaga";
import * as ProjectCategory from "./CyberBugs/ProjectCategorySaga";
import * as ProjectSaga from "./CyberBugs/CreateProjectSaga";

export function* rootSaga() {
    yield all([
        CyberBugs.followSignIn(),
        ProjectCategory.followGetAllProjectCategory(),
        ProjectSaga.followCreateProjectSaga(),
    ]);
}
