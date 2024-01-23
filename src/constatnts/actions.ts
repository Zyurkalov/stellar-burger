//непонятная ошибка с экспортом. Оставил на потом

export const AWAIT_DATA = "AWAIT_DATA";
export const GET_DATA_SUCCESS = "GET_DATA_SUCCESS";
export const GET_DATA_FAILED = "GET_DATA_FAILED";

export const AWAIT_ORDER = "AWAIT_ORDER";
export const MAKE_ORDER_SUCCES = "MAKE_ORDER_SUCCES";
export const MAKE_ORDER_FAILED = "MAKE_ORDER_FAILED";

export const SWITCH_TAB = 'SWITCH_TAB';

export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";
export const MOVE_INGREDIENT = "MOVE_INGREDIENT";
export const CLEANING_INGREDIENT_LIST = "CLEANING_INGREDIENT_LIST";

export const MODAL_ORDER_OPEN = 'MODAL_ORDER_OPEN';
export const MODAL_INGR_OPEN = 'MODAL_INGR_OPEN';
export const MODAL_CLOSE = 'MODAL_CLOSE';
export const MODAL_ERROR_OPEN = 'MODAL_EROR_OPEN';
export const MODAL_LOADING = 'MODAL_LOADING';

export const AWAIT_ORDDER_DETAILS = 'AWAIT_ORDDER_DETAILS';
export const ERROR_ORDDER_DETAILS = 'ERROR_ORDDER_DETAILS';
export const GET_ORDDER_DETAILS = 'GET_ORDDER_DETAILS';
export const COMPLETED_ORDDER_DETAILS = 'COMPLETED_ORDDER_DETAILS';

export const USER_LOGOUT = "USER_LOGOUT";
export const USER_LOADING = "USER_DATA_LOADING";
export const LOADING_STATUS ='LOADING_STATUS';
export const USER_DATA = "USER_DATA";

type wcAction = {
    connect: 'LIVE_CONNECT', 
    disconnect: 'LIVE_DISCONNECT',
    connecting: "WS_CONNECTING",
    open: 'WS_CONNECTION_OPEN',
    closed: 'WS_CONNECTION_CLOSED',
    error: 'WS_CONNECTION_ERROR',
    getMessage: 'WS_GET_MESSAGE',
    sendMessage: 'WS_SEND_MESSAGE',
}
export const wsAction: wcAction = {
    connect: 'LIVE_CONNECT', 
    disconnect: 'LIVE_DISCONNECT',
    connecting: "WS_CONNECTING",
    open: 'WS_CONNECTION_OPEN',
    closed: 'WS_CONNECTION_CLOSED',
    error: 'WS_CONNECTION_ERROR',
    getMessage: 'WS_GET_MESSAGE',
    sendMessage: 'WS_SEND_MESSAGE',
}