import { USER_LOGIN, USER_LOGOUT } from "../actions/authorisation";

const authState = {
  userAuthStatus: false,
};

export const authReducer = (state = authState, action) => {
  switch (action.type) {
    case USER_LOGIN: {
      return {
        ...state,
        userAuthStatus: action.payload,
      };
    }
    case USER_LOGOUT: {
      return {
        ...state,
        userAuthStatus: action.payload,
      };
    }
    default:
      return state;
  }
};
