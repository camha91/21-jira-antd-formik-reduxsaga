import { UPDATE_COMMENT } from "../constants/CommentConst";
import {
    CHANGE_ASSIGNEES,
    CHANGE_TASK_MODAL,
    GET_TASK_DETAIL,
    REMOVE_USER_ASSIGN,
} from "../constants/TaskConst";

const initialState = {
    taskDetailModal: {
        priorityTask: {
            priorityId: 2,
            priority: "Medium",
        },
        taskTypeDetail: {
            id: 2,
            taskType: "new task",
        },
        assigness: [
            {
                id: 169,
                avatar: "https://ui-avatars.com/api/?name=Crystal",
                name: "Crystal",
                alias: "crystal",
            },
        ],
        lstComment: [
            {
                avatar: "https://ui-avatars.com/api/?name=Crystal",
                commentContent: "hello",
                id: 320,
                idUser: 169,
                name: "Crystal",
            },
        ],
        taskId: 620,
        taskName: "Edit task",
        alias: "edit-task",
        description:
            '<p><strong><span style="background-color: #2dc26b;">Edit jira clone</span></strong></p>',
        statusId: "3",
        originalEstimate: 3,
        timeTrackingSpent: 3,
        timeTrackingRemaining: 5,
        typeId: 2,
        priorityId: 2,
        projectId: 677,
    },

    commentEdit: {
        id: 320,
        userId: 169,
        taskId: 620,
        contentComment: "string",
    },
};

const TaskReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TASK_DETAIL:
            return { ...state, taskDetailModal: action.taskDetailModal };

        case CHANGE_TASK_MODAL:
            const { name, value } = action;
            return {
                ...state,
                taskDetailModal: { ...state.taskDetailModal, [name]: value },
            };

        case CHANGE_ASSIGNEES:
            state.taskDetailModal.assigness = [
                ...state.taskDetailModal.assigness,
                action.userSelected,
            ];
            return { ...state };

        case REMOVE_USER_ASSIGN:
            state.taskDetailModal.assigness = [
                ...state.taskDetailModal.assigness.filter(
                    (user) => user.id !== action.userId
                ),
            ];
            return { ...state };
        case UPDATE_COMMENT:
            state.commentEdit = action.commentEditModel;
            return { ...state };
        default:
            return state;
    }
};

export default TaskReducer;
