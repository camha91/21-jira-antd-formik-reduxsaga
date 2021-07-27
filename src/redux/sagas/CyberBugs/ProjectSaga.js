import { call, delay, put, takeLatest } from "@redux-saga/core/effects";
import { cyberBugsService } from "../../../services/CyberBugsService";
import { projectService } from "../../../services/ProjectService";
import { STATUS_CODE } from "../../../utils/constants/settingSystem";
import { history } from "../../../utils/libs/history";
import { notifiFunction } from "../../../utils/notification/notificationCyberbugs";
import { CLOSE_DRAWER } from "../../constants/DrawerCyberBugsConst";
import {
    DISPLAY_LOADING,
    HIDE_LOADING,
} from "../../constants/LoadingConstants";
import {
    CREATE_PROJECT_SAGA,
    DELETE_PROJECT_SAGA,
    GET_ALL_PROJECT_SAGA,
    GET_PROJECT_DETAIL,
    GET_PROJECT_DETAIL_API,
    UPDATE_PROJECT_SAGA,
} from "../../constants/ProjectConst";
import {
    GET_ALL_PROJECTS_API,
    GET_PROJECT_DROPDOWN,
    GET_PROJECT_DROPDOWN_API,
} from "../../constants/ProjectCyberBugsConst";
import { GET_USER_PROJECT_BY_ID_API } from "../../constants/UserCyberBugsConst";

// Create Project
function* createProjectSaga(action) {
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

export function* trackingActionCreateProjectSaga() {
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

        yield put({
            type: GET_USER_PROJECT_BY_ID_API,
            idProject: data.content[0].id,
        });
    } catch (error) {
        console.log(error);
    }
    yield put({
        type: HIDE_LOADING,
    });
}

export function* trackingActionGetAllProjects() {
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

export function* trackingActionUpdateProjectSaga() {
    yield takeLatest(UPDATE_PROJECT_SAGA, updateProjectSaga);
}

//Delete Project
function* deleteProjectSaga(action) {
    // Show loading
    yield put({
        type: DISPLAY_LOADING,
    });
    yield delay(500);

    try {
        // Call api to get data
        const { data, status } = yield call(() =>
            projectService.deleteProject(action.idProject)
        );

        if (status === STATUS_CODE.SUCCESS) {
            // After calling api successfull then dispatch to reducer using put
            console.log(data);
            notifiFunction("success", "Delete project successfully!");
        } else {
            notifiFunction("error", "Delete project fail!");
        }

        yield put({
            type: GET_ALL_PROJECT_SAGA,
        });

        yield put({
            type: CLOSE_DRAWER,
        });
    } catch (error) {
        console.log(error);
        notifiFunction("error", "Delete project fail!");
    }
    yield put({
        type: HIDE_LOADING,
    });
}

export function* trackingActionDeleteProjectSaga() {
    yield takeLatest(DELETE_PROJECT_SAGA, deleteProjectSaga);
}

//Get Project Detail
function* getProjectDetailSaga(action) {
    try {
        // Call api to get data
        const { data, status } = yield call(() =>
            projectService.getProjectDetail(action.projectId)
        );

        // After calling api successfull then dispatch to reducer using put
        console.log(data);
        yield put({
            type: GET_PROJECT_DETAIL,
            projectDetail: data.content,
        });
    } catch (error) {
        console.log(error);
        history.push("/projectManagement");
    }
}

export function* trackingActionGetProjectDetailSaga() {
    yield takeLatest(GET_PROJECT_DETAIL_API, getProjectDetailSaga);
}

//Get All Projects for Dropdown
function* getAllDropdownProject(action) {
    try {
        // Call api to get data
        const { data, status } = yield call(() =>
            projectService.getDropDownProject()
        );

        // After calling api successfull then dispatch to reducer using put
        console.log(data);
        yield put({
            type: GET_PROJECT_DROPDOWN,
            arrProject: data.content,
        });
    } catch (error) {
        console.log(error);
    }
}

export function* trackingActionGetAllDropdownProject() {
    yield takeLatest(GET_PROJECT_DROPDOWN_API, getAllDropdownProject);
}
