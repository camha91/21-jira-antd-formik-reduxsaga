import { call, delay, put, select, takeLatest } from "@redux-saga/core/effects";
import { taskService } from "../../../services/TaskService";
import { STATUS_CODE } from "../../../utils/constants/settingSystem";
import { notifiFunction } from "../../../utils/notification/notificationCyberbugs";
import { CLOSE_DRAWER } from "../../constants/DrawerCyberBugsConst";
import {
    DISPLAY_LOADING,
    HIDE_LOADING,
} from "../../constants/LoadingConstants";
import { GET_PROJECT_DETAIL_API } from "../../constants/ProjectConst";
import {
    CHANGE_ASSIGNEES,
    CHANGE_TASK_MODAL,
    CREATE_TASK_API,
    GET_TASK_DETAIL,
    GET_TASK_DETAIL_API,
    HANDLE_CHANGE_POST_API_SAGA,
    REMOVE_USER_ASSIGN,
    UPDATE_TASK_API,
    UPDATE_TASK_STATUS_API,
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
            console.log(data);
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

export function* followCreateTaskSaga() {
    yield takeLatest(CREATE_TASK_API, createTaskSaga);
}

// Get task detail
function* getTaskDetailSaga(action) {
    try {
        const { data, status } = yield call(() =>
            taskService.getTaskDetail(action.taskId)
        );

        if (status === STATUS_CODE.SUCCESS) {
            console.log(data);
        }

        yield put({
            type: GET_TASK_DETAIL,
            taskDetailModal: data.content,
        });
    } catch (error) {
        console.log(error.response?.data);
    }
}

export function* followGetTaskDetailSaga() {
    yield takeLatest(GET_TASK_DETAIL_API, getTaskDetailSaga);
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
            console.log(data);

            yield put({
                type: GET_PROJECT_DETAIL_API,
                projectId: taskStatusUpdate.projectId,
            });

            yield put({
                type: GET_TASK_DETAIL_API,
                taskId: taskStatusUpdate.taskId,
            });
        }
    } catch (error) {
        console.log(error.response.data);
    }
}

export function* followUpdateTaskStatusSaga() {
    yield takeLatest(UPDATE_TASK_STATUS_API, updateTaskStatusSaga);
}

// Update task
function* updateTaskSaga(action) {}

export function* followUpdateTaskSaga() {
    yield takeLatest(UPDATE_TASK_API, updateTaskSaga);
}

export function* handleChangePostApi(action) {
    console.log("abc", action);
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
            console.log(data);

            yield put({
                type: GET_PROJECT_DETAIL_API,
                projectId: taskUpdateApi.projectId,
            });

            yield put({
                type: GET_TASK_DETAIL_API,
                taskId: taskUpdateApi.taskId,
            });
        }
    } catch (error) {
        console.log(error.response?.data);
    }
}

export function* followHandleChangePostApiSaga() {
    yield takeLatest(HANDLE_CHANGE_POST_API_SAGA, handleChangePostApi);
}
