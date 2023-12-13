import {
  GET_ORDDER_DETAILS,
  AWAIT_ORDDER_DETAILS,
  ERROR_ORDDER_DETAILS,
  COMPLETED_ORDDER_DETAILS,
} from "../actions/order-number";

const initialState = {
  request: false,
  order: false,
  error: "",
};

export const getOrderDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case AWAIT_ORDDER_DETAILS: {
      return {
        ...state,
        request: true,
      };
    }
    case ERROR_ORDDER_DETAILS: {
      return {
        ...state,
        request: false,
        error: action.error,
      };
    }
    case GET_ORDDER_DETAILS: {
      return {
        ...state,
        request: false,
        error: false,
        order: action.payload,
      };
    }
    case COMPLETED_ORDDER_DETAILS: {
      return {
        ...state,
        request: false,
        error: false,
      };
    }
    default: {
      return state;
    }
  }
};
