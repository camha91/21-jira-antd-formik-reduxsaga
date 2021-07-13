import { call, put, takeLatest } from "@redux-saga/core/effects";
import { commentService } from "../../../services/CommentService";
import { STATUS_CODE } from "../../../utils/constants/settingSystem";
import {
    INSERT_COMMENT,
    INSERT_COMMENT_API,
} from "../../constants/CommentConst";
import { GET_TASK_DETAIL_API } from "../../constants/TaskConst";

function* insertCommentSaga(action) {
    const { commentObj } = action;
    try {
        const { data, status } = yield call(() =>
            commentService.insertComment(commentObj)
        );
        console.log("dataComment", data);

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: INSERT_COMMENT,
                commentModal: data.content,
            });

            yield put({
                type: GET_TASK_DETAIL_API,
                taskId: commentObj.taskId,
            });
        }
    } catch (error) {
        console.log(error.response.data);
    }
}

export function* followInsertCommentSaga() {
    yield takeLatest(INSERT_COMMENT_API, insertCommentSaga);
}
