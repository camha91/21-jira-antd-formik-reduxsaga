import { applyMiddleware, combineReducers, createStore } from "redux";
import createMiddlewareSaga from "redux-saga";
import reduxThunk from "redux-thunk";
import LoadingReducer from "../redux/reducers/LoadingReducer";
import HistoryReducer from "./reducers/HistoryReducer";
import UserLoginCyberBugsReducer from "./reducers/UserCyberBugsReducer";
import { rootSaga } from "./sagas/rootSaga";

const middlewareSaga = createMiddlewareSaga();

const rootReducer = combineReducers({
    LoadingReducer,
    HistoryReducer,
    UserLoginCyberBugsReducer,
});

const store = createStore(
    rootReducer,
    applyMiddleware(reduxThunk, middlewareSaga)
);

middlewareSaga.run(rootSaga);

export default store;
