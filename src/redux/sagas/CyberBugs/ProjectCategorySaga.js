import { call, put, takeLatest } from "@redux-saga/core/effects";
import { cyberBugsService } from "../../../services/CyberBugsService";
import { STATUS_CODE } from "../../../utils/constants/settingSystem";
import {
    GET_ALL_PROJECT_CATEGORY,
    GET_ALL_PROJECT_CATEGORY_SAGA,
} from "../../constants/CyberBugsConst";

function* getAllProjectCategory(action) {
    console.log("actionSaga", action);

    try {
        // Call api to get data
        const { data, status } = yield call(() =>
            cyberBugsService.getAllProjectCategory()
        );

        if (status === STATUS_CODE.SUCCESS) {
            // After calling api successfull then dispatch to reducer using put
            yield put({
                type: GET_ALL_PROJECT_CATEGORY,
                data: data.content,
            });

            console.log("data", data);
        }
    } catch (error) {
        console.log(error);
    }
}

export function* followGetAllProjectCategory() {
    yield takeLatest(GET_ALL_PROJECT_CATEGORY_SAGA, getAllProjectCategory);
}
