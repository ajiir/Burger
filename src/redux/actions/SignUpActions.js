import axios from "axios"

export const signUpUser = (email, password) => {
  return function (dispatch) {
    dispatch(signUpUserStart());

    const data = {
      email, password, returnSecureToken: true
    };

    axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBUMFa0mdrl2ZRiMcJwI_VAUmOSh27iwS0",
      data).then(result => {
        // Local storage-d hadgalna
        const token = result.data.idToken
        const userId = result.data.localId
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        dispatch(signUpUserSuccess(token, userId));
      }).catch(err => {
        dispatch(signUpUserError(err));
      });


  };
};

export const signUpUserStart = () => {
  return {
    type: "SIGNUP_USER_START",
  };
};

export const signUpUserSuccess = (token, userId) => {
  return {
    type: "SIGNUP_USER_SUCCESS",
    token,
    userId
  };
};

export const signUpUserError = (error) => {
  return {
    type: "SIGNUP_USER_ERROR",
    error
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('expireDate');
  localStorage.removeItem('refreshToken');
  return {
    type: "LOGOUT"
  };
};

export const autoLogOutAfterMillisec = (ms) => {
  return function (dispatch) {
    setTimeout(() => {
      dispatch(logout())
    }, ms);
  };
};
