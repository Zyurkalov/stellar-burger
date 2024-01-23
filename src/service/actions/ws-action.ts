import { WS_URL } from "../../constatnts/apiUrl";
import { TIngredient } from "../../Types";

const CONNECTING: 'CONNECTING' = 'CONNECTING';
const ONLINE: 'ONLINE' = 'ONLINE';
const OFFLINE: 'OFFLINE' = 'OFFLINE';

export const WebsocketStatus = {
  CONNECTING: CONNECTING,
  ONLINE: ONLINE,
  OFFLINE: OFFLINE,
};
const LIVE_CONNECT: 'LIVE_CONNECT' = 'LIVE_CONNECT'
const LIVE_DISCONNECT: 'LIVE_DISCONNECT' = 'LIVE_DISCONNECT'

const WS_CONNECTING: "WS_CONNECTING" = "WS_CONNECTING";
const WS_CONNECTION_OPEN: 'WS_CONNECTION_OPEN' = 'WS_CONNECTION_OPEN';
const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
const WS_SEND_MESSAGE: 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';

export type TypeWsStatus = 
  typeof LIVE_CONNECT | 
  typeof LIVE_DISCONNECT | 
  typeof WS_CONNECTING | 
  typeof WS_CONNECTION_OPEN | 
  typeof WS_CONNECTION_CLOSED | 
  typeof WS_CONNECTION_ERROR | 
  typeof WS_GET_MESSAGE | 
  typeof WS_SEND_MESSAGE;

export const wsAction = {
    connect: LIVE_CONNECT , 
    disconnect: LIVE_DISCONNECT,
    connecting: WS_CONNECTING,
    open: WS_CONNECTION_OPEN,
    closed: WS_CONNECTION_CLOSED,
    error: WS_CONNECTION_ERROR,
    getMessage: WS_GET_MESSAGE,
    sendMessage: WS_SEND_MESSAGE,
}
type TConnect = {
  readonly type: typeof LIVE_CONNECT,
  readonly payload: string,
}
type TError = {
  readonly type: typeof WS_CONNECTION_ERROR,
  readonly payload: string | null,
}
type TDisconnect = {
  readonly type: typeof LIVE_DISCONNECT
}
type TConnecting = {
  readonly type: typeof WS_CONNECTING
}
type TConnectionOpen = {
  readonly type: typeof WS_CONNECTION_OPEN
}
type TConnectionClosed = {
  readonly type: typeof WS_CONNECTION_CLOSED
}
type TGetMessage = {
  readonly type: typeof WS_GET_MESSAGE,
  // payload: {order: TIngredient[], success: boolean, total: number, totalToday: number},
  payload: any,
}
type TSendMessage = {
  readonly type: typeof WS_SEND_MESSAGE
}

export type TypeWsAction = TConnect | TDisconnect | TError | TConnecting | TConnectionOpen | TConnectionClosed | TGetMessage | TSendMessage;
export const connect = (teg: string): TConnect => ({
    type: wsAction.connect,
    payload: `${WS_URL}/${teg}`
})
export const disconnect = (): TDisconnect => ({
    type: wsAction.disconnect
})
export const error = (text: string): TError => ({
    type: wsAction.error,
    payload: text,
})