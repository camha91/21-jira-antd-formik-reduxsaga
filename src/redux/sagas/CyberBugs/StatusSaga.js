import { call, put, takeLatest } from "@redux-saga/core/effects";
import { statusService } from "../../../services/StatusService";
import {
    GET_ALL_STATUS,
    GET_ALL_STATUS_API,
} from "../../constants/StatusConst";

function* getAllStatusSaga(action) {
    try {
        const { data, status } = yield call(() => statusService.getAllStatus());

        yield put({
            type: GET_ALL_STATUS,
            arrStatus: data.content,
        });
    } catch (error) {
        console.log(error.response?.data);
    }
}

export function* trackingActionGetAllStatusSaga() {
    yield takeLatest(GET_ALL_STATUS_API, getAllStatusSaga);
}
