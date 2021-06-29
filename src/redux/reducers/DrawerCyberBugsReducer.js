import React from "react";
import {
    CLOSE_DRAWER,
    OPEN_DRAWER,
    OPEN_FORM_EDIT_PROJECT,
    SET_SUBMIT_EDIT_PROJECT,
} from "../constants/CyberBugsConst";

const initialState = {
    visible: false,
    ComponentContentDrawer: <p>default</p>,
    callBackSubmit: (propsValue) => {
        alert("click demo");
    },
};

const DrawerReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_DRAWER:
            return { ...state, visible: true };
        case CLOSE_DRAWER:
            return { ...state, visible: false };
        case OPEN_FORM_EDIT_PROJECT:
            return {
                ...state,
                visible: true,
                ComponentContentDrawer: action.Component,
            };
        case SET_SUBMIT_EDIT_PROJECT:
            return {
                ...state,
                callBackSubmit: action.submitFunction,
            };
        default:
            return state;
    }
};

export default DrawerReducer;
