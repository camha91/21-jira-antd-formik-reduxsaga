import { GET_ALL_PROJECTS_API } from "../constants/CyberBugsConst";

const stateDefault = {
    projectList: [],
};

const ProjectCyberBugsReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case GET_ALL_PROJECTS_API: {
            state.projectList = action.projectList;
            return { ...state };
        }
        default:
            return state;
    }
};

export default ProjectCyberBugsReducer;
