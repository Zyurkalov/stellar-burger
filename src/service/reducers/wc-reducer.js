import {
  WS_CONNECTING,
  WS_CONNECTION_OPEN,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_GET_ORDERS,
} from "../actions/wc-action";

const WebsocketStatus = {
  CONNECTING: "CONNECTING...",
  ONLINE: "ONLINE",
  OFFLINE: "OFFLINE",
};
const initialState = {
  status: WebsocketStatus.OFFLINE,
  orders: [],
  error: "",
};

export function wcReducer(state = initialState, action) {
  switch (action.type) {
    case WS_CONNECTING:
      return {
        ...state,
        status: WebsocketStatus.CONNECTING,
        error: "",
      };
    case WS_CONNECTION_OPEN:
      return {
        ...state,
        status: WebsocketStatus.ONLINE,
        error: "",
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        status: WebsocketStatus.OFFLINE,
        error: action.payload,
      };
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        status: WebsocketStatus.OFFLINE,
        orders: [],
        error: "",
      };
    case WS_GET_ORDERS:
      return {
        ...state,
        orders: [action.payload],
        error: "",
      };
    default:
      return state;
  }
}
