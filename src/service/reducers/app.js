import { AWAIT_DATA, GET_DATA_FAILED, GET_DATA_SUCCESS } from "../actions/app";

const initialState = {
  dataRequest: false,
  dataFailed: false,
  data: [],
  error: '',
};
export const getDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case AWAIT_DATA: {
      return {
        ...state,
        dataRequest: true,
        dataFailed: false,
        err: '',
      }
    }
    case GET_DATA_SUCCESS: {
      return {
        ...state,
        dataRequest: false,
        dataFailed: false,
        data: action.feed
      }
    }
    case GET_DATA_FAILED: {
      return {
        ...state,
        dataRequest: false,
        dataFailed: true,
        error: action.error
      }
    }
    default: {
      return state
    }
  }
}