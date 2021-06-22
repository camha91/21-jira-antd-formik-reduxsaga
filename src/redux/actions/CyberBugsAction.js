import { USER_SIGNIN_API } from "../constants/CyberBugsConst";

export const signinCyberBugsAction = (email, password) => {
    return {
        type: USER_SIGNIN_API,
        userLogin: {
            email: email,
            password: password,
        },
    };
};
