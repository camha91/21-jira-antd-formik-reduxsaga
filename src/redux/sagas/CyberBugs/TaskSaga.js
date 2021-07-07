import { call, delay, put, takeLatest } from "@redux-saga/core/effects";
import { taskService } from "../../../services/TaskService";
import { STATUS_CODE } from "../../../utils/constants/settingSystem";
import { notifiFunction } from "../../../utils/notification/notificationCyberbugs";
import { CLOSE_DRAWER } from "../../constants/DrawerCyberBugsConst";
import {
    DISPLAY_LOADING,
    HIDE_LOADING,
} from "../../constants/LoadingConstants";
import { CREATE_TASK_API } from "../../constants/TaskConst";

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
