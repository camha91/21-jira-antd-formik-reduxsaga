import { applyMiddleware, combineReducers, createStore } from "redux";
import createMiddlewareSaga from "redux-saga";
import reduxThunk from "redux-thunk";
import LoadingReducer from "../redux/reducers/LoadingReducer";
import DrawerReducer from "./reducers/DrawerCyberBugsReducer";
import HistoryReducer from "./reducers/HistoryReducer";
import ProjectCategoryReducer from "./reducers/ProjectCategoryReducer";
import ProjectCyberBugsReducer from "./reducers/ProjectCyberBugsReducer";
import ProjectReducer from "./reducers/ProjectReducer";
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
});

const store = createStore(
    rootReducer,
    applyMiddleware(reduxThunk, middlewareSaga)
);

middlewareSaga.run(rootSaga);

export default store;
