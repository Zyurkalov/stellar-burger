import {
  AWAIT_ORDER,
  MAKE_ORDER_SUCCESS,
  MAKE_ORDER_FAILED,
  TBurgerAction as TAction
} from "../actions/burger-constructor";
import { TInitialStateBurgerConstructor as TReducer } from "./types";

const initialState: TReducer = {
  orderRequest: false,
  orderFailed: false,
  orderSuccess: false,
  orderNumber: null,
  text: '',
};

export const makeOrderReducer = (state = initialState, action: TAction): TReducer => {
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
    case MAKE_ORDER_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        orderSuccess: true,
        orderNumber: action.orderNumber,
      };
    }
    case MAKE_ORDER_FAILED: {
      return {
        ...state,
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
