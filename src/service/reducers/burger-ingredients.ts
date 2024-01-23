import { SWITCH_TAB, TSwitchTab } from "../actions/burger-ingredients";
import { TType } from "../../Types/index"

type TInitialSTate = {
  current: TType
}
const initialState: TInitialSTate = {
  current: "bun",
};

export const switchTabReducer = (state = initialState, action: TSwitchTab): TInitialSTate => {
  switch (action.type) {
    case SWITCH_TAB :
      return {
        ...state,
        current: action.value,
      };
    default: return state;
  }
};
