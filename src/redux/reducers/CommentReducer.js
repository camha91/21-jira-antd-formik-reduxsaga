import { INSERT_COMMENT } from "../constants/CommentConst";

const initialState = {
    commnentModal: {
        id: 325,
        userId: 169,
        taskId: 619,
        contentComment: "new comment",
        deleted: false,
        alias: "new-comment",
    },
};

const CommentReducer = (state = initialState, action) => {
    switch (action.type) {
        case INSERT_COMMENT:
            console.log("commentModal", state.commentModal);
            return { ...state, commnentModal: action.commnentModal };

        default:
            return state;
    }
};

export default CommentReducer;
