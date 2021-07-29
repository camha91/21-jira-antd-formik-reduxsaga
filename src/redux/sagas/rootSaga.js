import { all } from "redux-saga/effects";
import commentTrackingActionList from "./CyberBugs/CommentSaga";
import priorityTrackingActionList from "./CyberBugs/PrioritySaga";
import projectCategoryTrackingActionList from "./CyberBugs/ProjectCategorySaga";
import projectTrackingActionList from "./CyberBugs/ProjectSaga";
import statusTrackingActionList from "./CyberBugs/StatusSaga";
import taskTrackingActionList from "./CyberBugs/TaskSaga";
import taskTypeTrackingActionList from "./CyberBugs/TaskTypeSaga";
import userTrackingActionList from "./CyberBugs/UserCyberBugsSaga";

export function* rootSaga() {
    yield all([
        ...userTrackingActionList,

        ...projectCategoryTrackingActionList,

        ...projectTrackingActionList,

        ...priorityTrackingActionList,

        ...taskTypeTrackingActionList,

        ...taskTrackingActionList,

        ...statusTrackingActionList,

        ...commentTrackingActionList,
    ]);
}
