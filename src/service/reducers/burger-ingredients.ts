import { SWITCH_TAB, TSwitchTab } from "../actions/burger-ingredients";
import { TInitialStateBurgerIngredient as TReducer} from "./types";

const initialState: TReducer = {
  current: "bun",
};

export const switchTabReducer = (state = initialState, action: TSwitchTab): TReducer => {
  switch (action.type) {
    case SWITCH_TAB :
      return {
        ...state,
        current: action.value,
      };
    default: return state;
  }
};
