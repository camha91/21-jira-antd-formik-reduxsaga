import { all } from "redux-saga/effects";
import * as PrioritySaga from "./CyberBugs/PrioritySaga";
import * as ProjectCategory from "./CyberBugs/ProjectCategorySaga";
import * as ProjectSaga from "./CyberBugs/ProjectSaga";
import * as TaskTypeSaga from "./CyberBugs/TaskTypeSaga";
import * as UserCyberBugs from "./CyberBugs/UserCyberBugsSaga";
import * as TaskSaga from "./CyberBugs/TaskSaga";

export function* rootSaga() {
    yield all([
        UserCyberBugs.followSignIn(),
        UserCyberBugs.followGetUserSaga(),
        UserCyberBugs.followAddUserProjectSaga(),
        UserCyberBugs.followRemoveUserProjectSaga(),

        ProjectCategory.followGetAllProjectCategory(),

        ProjectSaga.followCreateProjectSaga(),
        ProjectSaga.followGetAllProjects(),
        ProjectSaga.followUpdateProjectSaga(),
        ProjectSaga.followDeleteProjectSaga(),
        ProjectSaga.followGetProjectDetailSaga(),
        ProjectSaga.followGetAllDropdownProject(),

        PrioritySaga.followGetAllPrioritySaga(),

        TaskTypeSaga.followGetAllTaskTypeSaga(),

        TaskSaga.followCreateTaskSaga(),
    ]);
}
