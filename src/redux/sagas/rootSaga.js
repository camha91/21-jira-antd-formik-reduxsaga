import { all } from "redux-saga/effects";
import * as CommentSaga from "./CyberBugs/CommentSaga";
import * as PrioritySaga from "./CyberBugs/PrioritySaga";
import * as ProjectCategory from "./CyberBugs/ProjectCategorySaga";
import * as ProjectSaga from "./CyberBugs/ProjectSaga";
import * as StatusSaga from "./CyberBugs/StatusSaga";
import * as TaskSaga from "./CyberBugs/TaskSaga";
import * as TaskTypeSaga from "./CyberBugs/TaskTypeSaga";
import * as UserCyberBugs from "./CyberBugs/UserCyberBugsSaga";

export function* rootSaga() {
    yield all([
        UserCyberBugs.followSignIn(),
        UserCyberBugs.followGetUserSaga(),
        UserCyberBugs.followAddUserProjectSaga(),
        UserCyberBugs.followRemoveUserProjectSaga(),
        UserCyberBugs.followGetUserByProjectIdSaga(),

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
        TaskSaga.followGetTaskDetailSaga(),
        TaskSaga.followUpdateTaskStatusSaga(),
        TaskSaga.followUpdateTaskSaga(),
        TaskSaga.followHandleChangePostApiSaga(),

        StatusSaga.followGetAllStatusSaga(),

        CommentSaga.followInsertCommentSaga(),
        // CommentSaga.followUpdateCommentSaga(),
        CommentSaga.followDeleteCommentSaga(),
    ]);
}
