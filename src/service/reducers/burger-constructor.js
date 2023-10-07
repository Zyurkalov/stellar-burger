import {
  AWAIT_ORDER,
  MAKE_ORDER_SUCCES,
  MAKE_ORDER_FAILED,
} from "../actions/burger-constructor";

const initialState = {
  orderRequest: false,
  orderFailed: false,
  orderNumber: null,
};

export const makeOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case AWAIT_ORDER: {
      return {
        ...state,
        orderRequest: true,
        orderFailed: false,
      };
    }
    case MAKE_ORDER_SUCCES: {
      return {
        orderRequest: false,
        orderFailed: false,
        orderNumber: action.number,
      };
    }
    case MAKE_ORDER_FAILED: {
      return {
        orderRequest: false,
        orderFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};
