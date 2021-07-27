import { call, put, takeLatest } from "@redux-saga/core/effects";
import { commentService } from "../../../services/CommentService";
import { STATUS_CODE } from "../../../utils/constants/settingSystem";
import {
    DELETE_COMMENT_API,
    INSERT_COMMENT_API,
    UPDATE_COMMENT_API
} from "../../constants/CommentConst";
import { GET_TASK_DETAIL_API } from "../../constants/TaskConst";

// Insert new comment
function* insertCommentSaga(action) {
  const { commentObj } = action;
  try {
    const { data, status } = yield call(() =>
      commentService.insertComment(commentObj)
    );

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

export function* trackingActionInsertCommentSaga() {
  yield takeLatest(INSERT_COMMENT_API, insertCommentSaga);
}

// Update comment
function* updateCommentSaga(action) {
  const { commentUpdate } = action;

  try {
   

    const { data, status } = yield call(() =>
      commentService.updateComment(commentUpdate)
    );

    if (status === STATUS_CODE.SUCCESS) {

      yield put({
        type: GET_TASK_DETAIL_API,
        taskId: commentUpdate.taskId,
      });
    }
  } catch (error) {
    console.log(error.response.data);
  }
}

export function* trackingActionUpdateCommentSaga() {
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

export function* trackingActionDeleteCommentSaga() {
  yield takeLatest(DELETE_COMMENT_API, deleteCommentSaga);
}

const commentTrackingActionList = [
  trackingActionInsertCommentSaga(),
  trackingActionUpdateCommentSaga(),
  trackingActionDeleteCommentSaga(),
];

export default commentTrackingActionList;
