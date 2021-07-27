import { applyMiddleware, combineReducers, createStore } from "redux";
import createMiddlewareSaga from "redux-saga";
import reduxThunk from "redux-thunk";
import LoadingReducer from "../redux/reducers/LoadingReducer";
import DrawerReducer from "./reducers/DrawerCyberBugsReducer";
import HistoryReducer from "./reducers/HistoryReducer";
import PriorityReducer from "./reducers/PriorityReducer";
import ProjectCategoryReducer from "./reducers/ProjectCategoryReducer";
import ProjectCyberBugsReducer from "./reducers/ProjectCyberBugsReducer";
import ProjectReducer from "./reducers/ProjectReducer";
import StatusReducer from "./reducers/StatusReducer";
import TaskReducer from "./reducers/TaskReducer";
import TaskTypeReducer from "./reducers/TaskTypeReducer";
import UserCyberBugsReducer from "./reducers/UserCyberBugsReducer";
import { rootSaga } from "./sagas/rootSaga";

const middlewareSaga = createMiddlewareSaga();

const rootReducer = combineReducers({
    LoadingReducer,
    HistoryReducer,
    UserCyberBugsReducer,
    ProjectCategoryReducer,
    ProjectCyberBugsReducer,
    DrawerReducer,
    ProjectReducer,
    PriorityReducer,
    TaskTypeReducer,
    StatusReducer,
    TaskReducer,
});

const store = createStore(
    rootReducer,
    applyMiddleware(reduxThunk, middlewareSaga)
);

middlewareSaga.run(rootSaga);

export default store;
