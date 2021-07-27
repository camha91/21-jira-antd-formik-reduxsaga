import { all } from "redux-saga/effects";
import commentTrackingActionList from "./CyberBugs/CommentSaga";
import * as PrioritySaga from "./CyberBugs/PrioritySaga";
import * as ProjectCategory from "./CyberBugs/ProjectCategorySaga";
import * as ProjectSaga from "./CyberBugs/ProjectSaga";
import * as StatusSaga from "./CyberBugs/StatusSaga";
import * as TaskSaga from "./CyberBugs/TaskSaga";
import * as TaskTypeSaga from "./CyberBugs/TaskTypeSaga";
import userTrackingActionList, * as UserCyberBugs from "./CyberBugs/UserCyberBugsSaga";

export function* rootSaga() {
    yield all([
       ...userTrackingActionList,

        ProjectCategory.trackingActionGetAllProjectCategory(),

        ProjectSaga.trackingActionCreateProjectSaga(),
        ProjectSaga.trackingActionGetAllProjects(),
        ProjectSaga.trackingActionUpdateProjectSaga(),
        ProjectSaga.trackingActionDeleteProjectSaga(),
        ProjectSaga.trackingActionGetProjectDetailSaga(),
        ProjectSaga.trackingActionGetAllDropdownProject(),

        PrioritySaga.trackingActionGetAllPrioritySaga(),

        TaskTypeSaga.trackingActionGetAllTaskTypeSaga(),

        TaskSaga.trackingActionCreateTaskSaga(),
        TaskSaga.trackingActionGetTaskDetailSaga(),
        TaskSaga.trackingActionUpdateTaskStatusSaga(),
        TaskSaga.trackingActionUpdateTaskSaga(),
        TaskSaga.trackingActionHandleChangePostApiSaga(),

        StatusSaga.trackingActionGetAllStatusSaga(),

        ...commentTrackingActionList,
    ]);
}
