import { call, delay, put, takeLatest } from "@redux-saga/core/effects";
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
    CREATE_TASK_API,
    GET_TASK_DETAIL,
    GET_TASK_DETAIL_API,
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
    console.log("taskStatusUpdate", action);

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
