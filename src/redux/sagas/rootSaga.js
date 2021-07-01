import { all } from "redux-saga/effects";
import * as CyberBugs from "./CyberBugs/UserCyberBugsSaga";
import * as ProjectCategory from "./CyberBugs/ProjectCategorySaga";
import * as ProjectSaga from "./CyberBugs/ProjectSaga";

export function* rootSaga() {
    yield all([
        CyberBugs.followSignIn(),
        CyberBugs.followGetUserSaga(),
        CyberBugs.followAddUserProjectSaga(),
        CyberBugs.followRemoveUserProjectSaga(),

        ProjectCategory.followGetAllProjectCategory(),

        ProjectSaga.followCreateProjectSaga(),
        ProjectSaga.followGetAllProjects(),
        ProjectSaga.followUpdateProjectSaga(),
        ProjectSaga.followDeleteProjectSaga(),
    ]);
}
