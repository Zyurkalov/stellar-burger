import {
  AWAIT_ORDDER_DETAILS,
  ERROR_ORDDER_DETAILS,
  GET_ORDDER_DETAILS,
  COMPLETED_ORDDER_DETAILS,
} from "../../constatnts/actions";
import { TOrderNumberAction as TAction } from "../actions/types";
import { TInitialStateOrderNumber as TReducer } from "./types";

const initialState: TReducer = {
  request: false,
  order: false,
  error: "",
};

export const getOrderDetailsReducer = (
  state = initialState,
  action: TAction
) => {
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
