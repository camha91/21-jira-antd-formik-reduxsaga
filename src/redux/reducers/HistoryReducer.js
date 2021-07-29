import { ADD_HISTORY } from "../constants/HistoryConst";

const historyState = {
    history: {},
};

const HistoryReducer = (state = historyState, action) => {
    switch (action.type) {
        case ADD_HISTORY: {
            state.history = action.history;
            return { ...state };
        }

        default:
            return { ...state };
    }
};

export default HistoryReducer;
