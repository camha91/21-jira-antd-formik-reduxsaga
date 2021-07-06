import { call, put, takeLatest } from "@redux-saga/core/effects";
import { taskTypeService } from "../../../services/TaskTypeService";
import {
    GET_ALL_TASK_TYPE,
    GET_ALL_TASK_TYPE_API,
} from "../../constants/TaskTypeConst";

function* getAllTaskTypeSaga(action) {
    try {
        const { data, status } = yield call(() => {
            taskTypeService.getAllTaskType();
        });

        yield put({
            type: GET_ALL_TASK_TYPE,
            arrTaskType: data.content,
        });
    } catch (error) {
        console.log(error);
    }
}

export function* followGetAllTaskTypeSaga() {
    yield takeLatest(GET_ALL_TASK_TYPE_API, getAllTaskTypeSaga);
}
