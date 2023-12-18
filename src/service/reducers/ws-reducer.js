import { wsAction } from "../actions/ws-action";

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

export function wsReducer(state = initialState, action) {
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
