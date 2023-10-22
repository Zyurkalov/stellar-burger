import {
  AWAIT_ORDER,
  MAKE_ORDER_SUCCES,
  MAKE_ORDER_FAILED,
} from "../actions/burger-constructor";

const initialState = {
  orderRequest: false,
  orderFailed: false,
  orderSuccess: false,
  orderNumber: null,
  text: '',
};

export const makeOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case AWAIT_ORDER: {
      return {
        ...state,
        orderRequest: true,
        orderFailed: false,
        orderSuccess: false,
        orderNumber: null,
        text: ''
      };
    }
    case MAKE_ORDER_SUCCES: {
      return {
        orderRequest: false,
        orderSuccess: true,
        orderNumber: action.orderNumber,
      };
    }
    case MAKE_ORDER_FAILED: {
      return {
        orderRequest: false,
        orderFailed: true,
        text: action.textErr,
      };
    }
    default: {
      return state;
    }
  }
};
