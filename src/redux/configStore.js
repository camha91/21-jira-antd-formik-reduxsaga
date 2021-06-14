import { applyMiddleware, combineReducers, createStore } from "redux";
import LoadingReducer from "../redux/reducers/LoadingReducer";
// import createMiddlewareSaga from "redux-saga";
// import { rootSaga } from "./sagas/rootSaga";

// const middlewareSaga = createMiddlewareSaga();

const rootReducer = combineReducers({ LoadingReducer });

const store = createStore(rootReducer);

// middlewareSaga.run(rootSaga);

export default store;
