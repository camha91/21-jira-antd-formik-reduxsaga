import { call, delay, put, select, takeLatest } from "@redux-saga/core/effects";
import { taskService } from "../../../services/TaskService";
import { STATUS_CODE } from "../../../utils/constants/settingSystem";
import { notifiFunction } from "../../../utils/notification/notificationCyberbugs";
import { CLOSE_DRAWER } from "../../constants/DrawerCyberBugsConst";
import {
    DISPLAY_LOADING,
    HIDE_LOADING,
} from "../../constants/LoadingConstants";
import { GET_PROJECT_DETAIL_SAGA } from "../../constants/ProjectConst";
import {
    CHANGE_ASSIGNEES,
    CHANGE_TASK_MODAL,
    CREATE_TASK_SAGA,
    GET_TASK_DETAIL,
    GET_TASK_DETAIL_SAGA,
    HANDLE_CHANGE_POST_API_SAGA,
    REMOVE_USER_ASSIGN,
    UPDATE_TASK_SAGA,
    UPDATE_TASK_STATUS_SAGA,
} from "../../constants/TaskConst";

function* createTaskSaga(action) {
    try {
        yield put({
            type: DISPLAY_LOADING,
        });

        yield delay(300);

        const { data, status } = yield call(() =>
            taskService.createTask(action.taskObject)
        );

        if (status === STATUS_CODE.SUCCESS) {
        }
        yield put({
            type: CLOSE_DRAWER,
        });
        notifiFunction("success", "Create task successfully!");
    } catch (error) {
        console.log(error.response.data);
    }

    yield put({
        type: HIDE_LOADING,
    });
}

export function* trackingActionCreateTaskSaga() {
    yield takeLatest(CREATE_TASK_SAGA, createTaskSaga);
}

// Get task detail
function* getTaskDetailSaga(action) {
    try {
        const { data, status } = yield call(() =>
            taskService.getTaskDetail(action.taskId)
        );

        if (status === STATUS_CODE.SUCCESS) {
        }

        yield put({
            type: GET_TASK_DETAIL,
            taskDetailModal: data.content,
        });
    } catch (error) {
        console.log(error.response?.data);
    }
}

export function* trackingActionGetTaskDetailSaga() {
    yield takeLatest(GET_TASK_DETAIL_SAGA, getTaskDetailSaga);
}

// Update task status
function* updateTaskStatusSaga(action) {
    const { taskStatusUpdate } = action;

    try {
        // Update api status for current task
        const { data, status } = yield call(() =>
            taskService.updateTaskStatus(taskStatusUpdate)
        );

        // After calling api successfully, call getProjectDetail saga to organize all task info
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_PROJECT_DETAIL_SAGA,
                projectId: taskStatusUpdate.projectId,
            });

            yield put({
                type: GET_TASK_DETAIL_SAGA,
                taskId: taskStatusUpdate.taskId,
            });
        }
    } catch (error) {
        console.log(error.response.data);
    }
}

export function* trackingActionUpdateTaskStatusSaga() {
    yield takeLatest(UPDATE_TASK_STATUS_SAGA, updateTaskStatusSaga);
}

// Update task
function* updateTaskSaga(action) {}

export function* trackingActionUpdateTaskSaga() {
    yield takeLatest(UPDATE_TASK_SAGA, updateTaskSaga);
}

export function* handleChangePostApi(action) {
    // Call action to change taskDetailModal
    switch (action.actionType) {
        case CHANGE_TASK_MODAL:
            {
                const { value, name } = action;

                yield put({
                    type: CHANGE_TASK_MODAL,
                    name,
                    value,
                });
            }
            break;
        case CHANGE_ASSIGNEES:
            {
                const { userSelected } = action;

                yield put({
                    type: CHANGE_ASSIGNEES,
                    userSelected,
                });
            }
            break;
        case REMOVE_USER_ASSIGN:
            {
                const { userId } = action;

                yield put({
                    type: REMOVE_USER_ASSIGN,
                    userId,
                });
            }
            break;
        default:
            break;
    }

    // Save through api updateTaskSaga
    // Get data from state.taskDetailModal
    const { taskDetailModal } = yield select((state) => state.TaskReducer);
    // console.log("taskDetailModal after change", taskDetailModal);

    // Change data state.taskDetailModal to data api need
    const listUserAsign = taskDetailModal.assigness?.map((user, index) => {
        return user.id;
    });

    const taskUpdateApi = { ...taskDetailModal, listUserAsign };
    // console.log("taskUpdate", taskUpdateApi);

    try {
        const { data, status } = yield call(() =>
            taskService.updateTask(taskUpdateApi)
        );

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_PROJECT_DETAIL_SAGA,
                projectId: taskUpdateApi.projectId,
            });

            yield put({
                type: GET_TASK_DETAIL_SAGA,
                taskId: taskUpdateApi.taskId,
            });
        }
    } catch (error) {
        console.log(error.response?.data);
    }
}

export function* trackingActionHandleChangePostApiSaga() {
    yield takeLatest(HANDLE_CHANGE_POST_API_SAGA, handleChangePostApi);
}

const taskTrackingActionList = [
    trackingActionCreateTaskSaga(),
    trackingActionGetTaskDetailSaga(),
    trackingActionUpdateTaskStatusSaga(),
    trackingActionUpdateTaskSaga(),
    trackingActionHandleChangePostApiSaga(),
];

export default taskTrackingActionList;
