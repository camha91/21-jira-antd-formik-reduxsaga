import { UPDATE_COMMENT } from "../constants/CommentConst";

const initialState = {
    commentEdit: {
        id: 320,
        userId: 169,
        taskId: 620,
        contentComment: "string",
    },
};

const CommentReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_COMMENT:
            return { ...state, commentEdit: action.commentEditModel };

        default:
            return state;
    }
};

export default CommentReducer;
