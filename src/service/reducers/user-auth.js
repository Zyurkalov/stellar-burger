import {
  USER_LOGOUT,
  USER_DATA,
  LOADING_STATUS,
} from "../actions/user-auth";

const authState = {
  userData: {email: '', name: ''},
  loading: {status: false, message: ''},
  // isLoggedIn: false,
};

export const authReducer = (state = authState, action) => {

  switch (action.type) {

    case USER_LOGOUT: {
      return authState
    }
    case USER_DATA: {
      return {
        ...state,
        userData: action.payload,
        // isLoggedIn: true,
      }
    }
    case LOADING_STATUS: {
      return {
        ...state,
        loading: action.payload,
      }
    }
    default:
      return state;
  }
};
