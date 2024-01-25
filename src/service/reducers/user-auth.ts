import {
  USER_LOGOUT,
  USER_DATA,
  LOADING_STATUS,
  TUserAuthAction as TAction,
} from "../actions/user-auth";
import { TInitialStateUserAuth as TReducer } from "./types";

const initialState: TReducer = {
  userData: {email: '', name: ''},
  loading: {status: false, message: ''},
  // isLoggedIn: false,
};

export const authReducer = (state = initialState, action: TAction) => {

  switch (action.type) {

    case USER_LOGOUT: {
      return initialState
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
