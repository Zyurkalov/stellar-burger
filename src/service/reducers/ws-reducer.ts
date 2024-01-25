
import { wsAction, WebsocketStatus, TypeWsAction as TAction } from "../actions/ws-action";
import { TInitialStateWcReducer as TReducer} from "./types";

const initialState: TReducer = {
  status: WebsocketStatus.OFFLINE,
  orders: [],
  error: "",
};

export const wsReducer = (state: TReducer = initialState, action: TAction): TReducer => {
  switch (action.type) {
    case wsAction.connecting:
      return {
        ...state,
        status: WebsocketStatus.CONNECTING,
        error: "",
      };
    case wsAction.open:
      return {
        ...state,
        status: WebsocketStatus.ONLINE,
        error: "",
      };

    case wsAction.error:
      return {
        ...state,
        status: WebsocketStatus.OFFLINE,
        error: action.payload,
      };
    case wsAction.closed:
      return {
        ...state,
        status: WebsocketStatus.OFFLINE,
        orders: [],
        error: "",
      };
    case wsAction.getMessage:

      return {
        ...state,
        orders: [action.payload],
        error: "",
      };
    default:
      return state;
  }
}
