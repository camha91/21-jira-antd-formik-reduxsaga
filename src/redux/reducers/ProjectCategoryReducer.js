import { GET_ALL_PROJECT_CATEGORY } from "../constants/CyberBugsConst";

const stateDefault = {
    arrProjectCategory: [],
};

const ProjectCategoryReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case GET_ALL_PROJECT_CATEGORY: {
            state.arrProjectCategory = action.data;
            return { ...state };
        }
        default:
            return state;
    }
};

export default ProjectCategoryReducer;
