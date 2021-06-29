const initialState = {
    projectEdit: {
        id: 0,
        projectName: "string",
        creator: 0,
        description: "string",
        categoryId: "2",
    },
};

const ProjectReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default ProjectReducer;
