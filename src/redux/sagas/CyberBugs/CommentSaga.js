import { call, put, takeLatest } from "@redux-saga/core/effects";
import { commentService } from "../../../services/CommentService";
import { STATUS_CODE } from "../../../utils/constants/settingSystem";
import {
    DELETE_COMMENT_API,
    INSERT_COMMENT_API,
    UPDATE_COMMENT,
    UPDATE_COMMENT_API,
} from "../../constants/CommentConst";
import { GET_TASK_DETAIL_API } from "../../constants/TaskConst";

// Insert new comment
function* insertCommentSaga(action) {
    const { commentObj } = action;
    try {
        const { data, status } = yield call(() =>
            commentService.insertComment(commentObj)
        );
        console.log("dataComment", data);

        if (status === STATUS_CODE.SUCCESS) {
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

// Update comment
function* updateCommentSaga(action) {
    const { commentUpdate } = action;
    console.log("commentUpdate", commentUpdate);

    try {
        const { data, status } = yield call(() =>
            commentService.updateComment(commentUpdate)
        );
        console.log("dataCommentUpdate", data);

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: UPDATE_COMMENT,
                commentEditModel: data.content,
            });

            yield put({
                type: GET_TASK_DETAIL_API,
                taskId: commentUpdate.taskId,
            });
        }
    } catch (error) {
        console.log(error.response.data);
    }
}

export function* followUpdateCommentSaga() {
    yield takeLatest(UPDATE_COMMENT_API, updateCommentSaga);
}

// Delete comment
function* deleteCommentSaga(action) {
    const { commentDeleteObj } = action;

    try {
        const { data, status } = yield call(() =>
            commentService.deleteComment(commentDeleteObj.id)
        );

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASK_DETAIL_API,
                taskId: commentDeleteObj.taskId,
            });
        }
    } catch (error) {
        console.log(error.response.data);
    }
}

export function* followDeleteCommentSaga() {
    yield takeLatest(DELETE_COMMENT_API, deleteCommentSaga);
}
