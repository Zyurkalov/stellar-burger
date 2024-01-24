import { TIngredient, TListOrders } from "../../Types";
import { wsAction, WebsocketStatus, TypeWsStatus, TypeWsAction } from "../actions/ws-action";

// const CONNECTING: 'CONNECTING' = 'CONNECTING';
// const ONLINE: 'ONLINE' = 'ONLINE';
// const OFFLINE: 'OFFLINE' = 'OFFLINE';

// const WebsocketStatus = {
//   CONNECTING: CONNECTING,
//   ONLINE: ONLINE,
//   OFFLINE: OFFLINE,
// };
type TOrders = {
  orders: TListOrders[], 
  success: boolean, 
  total: number | null, 
  totalToday: number | null,
}

type TInitialState = {
  status: 'CONNECTING' | 'ONLINE' | 'OFFLINE',
  orders: TOrders[] | [],
  error: string | null,
}
const initialState: TInitialState = {
  status: WebsocketStatus.OFFLINE,
  orders: [],
  error: "",
};

export const wsReducer = (state: TInitialState = initialState, action: TypeWsAction): TInitialState => {
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
