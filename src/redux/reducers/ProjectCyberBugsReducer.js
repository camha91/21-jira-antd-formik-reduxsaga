import {
    GET_ALL_PROJECTS_API,
    GET_PROJECT_DROPDOWN,
} from "../constants/ProjectCyberBugsConst";

const stateDefault = {
    projectList: [],
    arrProject: [],
};

const ProjectCyberBugsReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case GET_ALL_PROJECTS_API: {
            state.projectList = action.projectList;
            return { ...state };
        }
        case GET_PROJECT_DROPDOWN: {
            return { ...state, arrProject: action.arrProject };
        }
        default:
            return state;
    }
};

export default ProjectCyberBugsReducer;
