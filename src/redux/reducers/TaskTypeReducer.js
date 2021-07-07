import { GET_ALL_TASK_TYPE } from "../constants/TaskTypeConst";

const initialState = {
    arrTaskType: [],
};

const TaskTypeReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_TASK_TYPE:
            return { ...state, arrTaskType: action.arrTaskType };

        default:
            return state;
    }
};

export default TaskTypeReducer;
