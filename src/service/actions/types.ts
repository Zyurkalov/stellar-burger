import { TIngredient, TListOrders, TType, TUserAuth } from "../../types"
import {
  AWAIT_DATA, GET_DATA_SUCCESS, GET_DATA_FAILED, AWAIT_ORDER, MAKE_ORDER_SUCCESS, MAKE_ORDER_FAILED, SWITCH_TAB, ADD_INGREDIENT, DELETE_INGREDIENT, 
  MOVE_INGREDIENT, CLEANING_INGREDIENT_LIST, MODAL_ORDER_OPEN, MODAL_INGR_OPEN, MODAL_CLOSE, MODAL_ERROR_OPEN, MODAL_LOADING, AWAIT_ORDDER_DETAILS, 
  ERROR_ORDDER_DETAILS, GET_ORDDER_DETAILS, COMPLETED_ORDDER_DETAILS, USER_DATA, LOADING_STATUS, USER_LOGOUT,
} from "../../constatnts/actions"
import { LIVE_CONNECT, LIVE_DISCONNECT, WS_CONNECTING, WS_CONNECTION_OPEN, WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_GET_MESSAGE, WS_SEND_MESSAGE } from "../../constatnts/ws"

///////////////////////////////////////////////////////////////////////////// app

export type AwaitData = {
  readonly type: typeof AWAIT_DATA
}
export type DataSuccess = {
  readonly type: typeof GET_DATA_SUCCESS;
  readonly feed: TIngredient[];
}
export type DataFailed = {
  readonly type: typeof GET_DATA_FAILED;
  readonly error: string;
}
export type TAppAction = AwaitData | DataSuccess | DataFailed;

///////////////////////////////////////////////////////////////////////////// burger-constructor

type TOrderAwait = {
  readonly type: typeof AWAIT_ORDER;
}
type TOrderSuccess = {
  readonly type: typeof MAKE_ORDER_SUCCESS;
  readonly orderNumber: number;
}
type TOrderFailed = {
  readonly type: typeof MAKE_ORDER_FAILED;
  readonly textErr: string;
}

export type TBurgerAction = TOrderAwait | TOrderSuccess | TOrderFailed;

///////////////////////////////////////////////////////////////////////////// burger-ingredients

export type TSwitchTab = {
  readonly type: typeof SWITCH_TAB,
  readonly value: TType;
}
///////////////////////////////////////////////////////////////////////////// constructor

type TAddIngredient = {
  readonly type: typeof ADD_INGREDIENT,
  readonly ingr: TIngredient & { uniqueId: string }
}
type TDeleteIngredient = {
  readonly type: typeof DELETE_INGREDIENT,
  readonly ingr: number
}
type TMoveIngredient = {
  readonly type: typeof MOVE_INGREDIENT,
  readonly hoverIndex: number,
  readonly dragIndex: number,
}
type TCleaninIngredientList = {
  readonly type: typeof CLEANING_INGREDIENT_LIST
}
export type TConsructorAction = TAddIngredient | TDeleteIngredient | TMoveIngredient | TCleaninIngredientList

///////////////////////////////////////////////////////////////////////////// modal

type TCloseModal = {
  readonly type: typeof MODAL_CLOSE
}
type TOpenOrderModal = {
  readonly type: typeof MODAL_ORDER_OPEN
}
type TOpenIngrModal = {
  readonly type: typeof MODAL_INGR_OPEN;
  readonly ingrList: TIngredient;
}
type TShowModalError = {
  readonly type: typeof MODAL_ERROR_OPEN;
  readonly payload: string,
}
type TShowLoading = {
  readonly type: typeof MODAL_LOADING;
  readonly payload: string;
}
export type TypeModalAction = TCloseModal | TOpenOrderModal | TOpenIngrModal | TShowModalError | TShowLoading;

///////////////////////////////////////////////////////////////////////////// order-number

// export const typeOrderAction = {
//   actionAwait: AWAIT_ORDDER_DETAILS,
//   actionError: ERROR_ORDDER_DETAILS,
//   actionGet: GET_ORDDER_DETAILS,
//   actionCompleted: COMPLETED_ORDDER_DETAILS,
// }
type TAwaitOrderDetails = {
  type: typeof AWAIT_ORDDER_DETAILS;
  request: boolean;
}
type TCompletedOrderDetails = {
  type: typeof COMPLETED_ORDDER_DETAILS;
  request: boolean;
  error: boolean;
}
type TErrorOrderDetails = {
  type: typeof ERROR_ORDDER_DETAILS;
  request: boolean;
  error: string;
}
type TGetOrderDetails = {
  type: typeof GET_ORDDER_DETAILS;
  request: boolean;
  error: boolean;
  payload: TIngredient[];
}
export type TOrderNumberAction = TAwaitOrderDetails | TCompletedOrderDetails | TErrorOrderDetails | TGetOrderDetails

///////////////////////////////////////////////////////////////////////////// user-auth

type TSetUserData = {
  type: typeof USER_DATA,
  payload: TUserAuth,
}
type TUserLogout = {
  type: typeof USER_LOGOUT,
}
type TLoadingStatus = {
  type: typeof LOADING_STATUS,
  payload: boolean,
}
export type TUserAuthAction = TSetUserData | TUserLogout | TLoadingStatus

///////////////////////////////////////////////////////////////////////////// ws-action

// const CONNECTING: 'CONNECTING' = 'CONNECTING';
// const ONLINE: 'ONLINE' = 'ONLINE';
// const OFFLINE: 'OFFLINE' = 'OFFLINE';

// export const WebsocketStatus = {
//   CONNECTING: CONNECTING,
//   ONLINE: ONLINE,
//   OFFLINE: OFFLINE,
// };
// const LIVE_CONNECT: 'LIVE_CONNECT' = 'LIVE_CONNECT'
// const LIVE_DISCONNECT: 'LIVE_DISCONNECT' = 'LIVE_DISCONNECT'

// const WS_CONNECTING: "WS_CONNECTING" = "WS_CONNECTING";
// const WS_CONNECTION_OPEN: 'WS_CONNECTION_OPEN' = 'WS_CONNECTION_OPEN';
// const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
// const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
// const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
// const WS_SEND_MESSAGE: 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';
// LIVE_CONNECT, LIVE_DISCONNECT, WS_CONNECTING, WS_CONNECTION_OPEN, WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_GET_MESSAGE, WS_SEND_MESSAGE
export type TypeWsStatus =
  typeof LIVE_CONNECT |
  typeof LIVE_DISCONNECT |
  typeof WS_CONNECTING |
  typeof WS_CONNECTION_OPEN |
  typeof WS_CONNECTION_CLOSED |
  typeof WS_CONNECTION_ERROR |
  typeof WS_GET_MESSAGE |
  typeof WS_SEND_MESSAGE;

type TAction<Type extends TypeWsStatus, Payload = undefined> = Payload extends undefined
  ? { readonly type: Type }
  : { readonly type: Type, readonly payload: Payload }

export type TConnect = TAction<typeof LIVE_CONNECT, string>
export type TError = TAction<typeof WS_CONNECTION_ERROR, string | null>
export type TDisconnect = TAction<typeof LIVE_DISCONNECT>
type TConnecting = TAction<typeof WS_CONNECTING>
type TConnectionOpen = TAction<typeof WS_CONNECTION_OPEN>
type TConnectionClosed = TAction<typeof WS_CONNECTION_CLOSED>
type TGetMessage = TAction<typeof WS_GET_MESSAGE, { orders: TListOrders[], success: boolean, total: number, totalToday: number }>
type TSendMessage = TAction<typeof WS_SEND_MESSAGE>

export type TypeWsAction = TConnect | TDisconnect | TError | TConnecting | TConnectionOpen | TConnectionClosed | TGetMessage | TSendMessage

