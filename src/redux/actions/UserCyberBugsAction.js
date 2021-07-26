import {
    USER_SIGNIN_API,
    USER_SIGNUP_API,
} from "../constants/UserCyberBugsConst";

export const signinCyberBugsAction = (email, password) => {
    return {
        type: USER_SIGNIN_API,
        userLogin: {
            email: email,
            password: password,
        },
    };
};

export const signupCyberBugsAction = (email, password, phoneNumber, name) => {
    console.log("register obj", email, password, phoneNumber, name);
    return {
        type: USER_SIGNUP_API,
        userRegister: {
            email: email,
            password: password,
            phoneNumber: phoneNumber,
            name: name,
        },
    };
};
