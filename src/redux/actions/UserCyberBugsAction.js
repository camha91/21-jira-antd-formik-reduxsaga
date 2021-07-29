import {
    USER_SIGNIN_SAGA,
    USER_SIGNUP_SAGA,
} from "../constants/UserCyberBugsConst";

export const signinCyberBugsAction = (email, password) => {
    return {
        type: USER_SIGNIN_SAGA,
        userLogin: {
            email: email,
            password: password,
        },
    };
};

export const signupCyberBugsAction = (email, password, phoneNumber, name) => {
    return {
        type: USER_SIGNUP_SAGA,
        userSignUp: {
            email: email,
            password: password,
            phoneNumber: phoneNumber,
            name: name,
        },
    };
};
