import { call, delay, put, takeLatest } from "@redux-saga/core/effects";
import { cyberBugsService } from "../../../services/CyberBugsService";
import { STATUS_CODE } from "../../../utils/constants/settingSystem";
import { history } from "../../../utils/libs/history";
import {
    CLOSE_DRAWER,
    CREATE_PROJECT_SAGA,
    GET_ALL_PROJECTS_API,
    GET_ALL_PROJECT_SAGA,
} from "../../constants/CyberBugsConst";
import {
    DISPLAY_LOADING,
    HIDE_LOADING,
} from "../../constants/LoadingConstants";

// Create Project
function* createProjectSaga(action) {
    console.log("create Project Saga", action);

    // Show loading
    yield put({
        type: DISPLAY_LOADING,
    });
    yield delay(500);

    try {
        // Call api to get data
        const { data, status } = yield call(() =>
            cyberBugsService.createProjectAuthorization(action.newProject)
        );

        if (status === STATUS_CODE.SUCCESS) {
            // After calling api successfull then dispatch to reducer using put
            console.log(data);

            history.push("/projectManagement");
        }
    } catch (error) {
        console.log(error);
    }
    yield put({
        type: HIDE_LOADING,
    });
}

export function* followCreateProjectSaga() {
    yield takeLatest(CREATE_PROJECT_SAGA, createProjectSaga);
}

// Get all projects
function* getAllProjects(action) {
    yield put({
        type: DISPLAY_LOADING,
    });

    yield delay(500);

    try {
        const { data, status } = yield call(() =>
            cyberBugsService.getAllProjects()
        );

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_PROJECTS_API,
                projectList: data.content,
            });
        }
    } catch (error) {
        console.log(error);
    }
    yield put({
        type: HIDE_LOADING,
    });
}

export function* followGetAllProjects() {
    yield takeLatest(GET_ALL_PROJECT_SAGA, getAllProjects);
}

//Update Project
function* updateProjectSaga(action) {
    // Show loading
    yield put({
        type: DISPLAY_LOADING,
    });
    yield delay(500);

    try {
        // Call api to get data
        const { data, status } = yield call(() =>
            cyberBugsService.updateProject(action.projectUpdate)
        );

        if (status === STATUS_CODE.SUCCESS) {
            // After calling api successfull then dispatch to reducer using put
            console.log(data);
        }

        yield put({
            type: GET_ALL_PROJECT_SAGA,
        });

        yield put({
            type: CLOSE_DRAWER,
        });
    } catch (error) {
        console.log(error);
    }
    yield put({
        type: HIDE_LOADING,
    });
}

export function* followUpdateProjectSaga() {
    yield takeLatest("UPDATE_PROJECT_SAGA", updateProjectSaga);
}
