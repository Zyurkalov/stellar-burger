import {
  USER_LOGIN,
  USER_LOGOUT,
  USER_REGISTER,
  USER_LOADING,
  USER_DATA,
  USER_AUTH_STATUS,
} from "../actions/user-auth";

const authState = {
  userAuthStatus: false,
  userData: {email: '', name: ''}
};

export const authReducer = (state = authState, action) => {

  switch (action.type) {

    case USER_LOGOUT: {
      return {
        userAuthStatus: false,
        userData: {email: '', name: ''}
      }
    }
    case USER_AUTH_STATUS: {
      return {
        ...state,
        userAuthStatus: action.payload,
      }
    }
    case USER_DATA: {
      return {
        ...state,
        userData: action.payload,
      }
    }
    default:
      return state;
  }
};
