import axios from "axios"
import * as actions from "../actions/SignUpActions"

export const loginUser = (email, password) => {
    return function (dispatch) {
        dispatch(loginUserStart());

        const data = {
            email, password, returnSecureToken: true
        };

        axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBUMFa0mdrl2ZRiMcJwI_VAUmOSh27iwS0",
            data).then(result => {
                // Local storage-d hadgalna
                const token = result.data.idToken
                const userId = result.data.localId
                const expiresIn = result.data.expiresIn
                const refreshToken = result.data.refreshToken
                const expireDate = new Date(new Date().getTime() + expiresIn * 1000)

                localStorage.setItem('token', token);
                localStorage.setItem('userId', userId);
                localStorage.setItem('expireDate', expireDate);
                localStorage.setItem('refreshToken', refreshToken);

                dispatch(loginUserSuccess(token, userId));
                dispatch(actions.autoLogOutAfterMillisec(expiresIn * 1000));

            }).catch(err => {
                dispatch(loginUserError(err));
            });


    };
};

export const loginUserStart = () => {
    return {
        type: "LOGIN_USER_START",
    };
};

export const loginUserSuccess = (token, userId) => {
    return {
        type: "LOGIN_USER_SUCCESS",
        token,
        userId
    };
};

export const loginUserError = (error) => {
    return {
        type: "LOGIN_USER_ERROR",
        error
    };
};