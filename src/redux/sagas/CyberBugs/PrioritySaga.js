import { call, put, takeLatest } from "@redux-saga/core/effects";
import { priorityService } from "../../../services/PriorityService";
import {
    GET_ALL_PRIORITY,
    GET_ALL_PRIORITY_API,
} from "../../constants/PriorityConst";

function* getAllPrioritySaga(action) {
    try {
        const { data, status } = yield call(() =>
            priorityService.getAllPriority()
        );

        yield put({ type: GET_ALL_PRIORITY, arrPriority: data.content });
    } catch (error) {
        console.log(error);
    }
}

export function* followGetAllPrioritySaga() {
    yield takeLatest(GET_ALL_PRIORITY_API, getAllPrioritySaga);
}
