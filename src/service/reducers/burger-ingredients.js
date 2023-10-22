import { SWITCH_TAB } from "../actions/burger-ingredients";

const initialState = {
  current: "bun",
};

export const switchTabReducer = (state = initialState, action) => {
  switch (action.type) {
    case SWITCH_TAB :
      return {
        ...state,
        current: action.value,
      };
    default:
      return state;
  }
};
