import { WC_URL } from "../../constatnts/apiUrl";

export const LIVE_CONNECT = 'LIVE_CONNECT'
export const LIVE_DISCONNECT = 'LIVE_DISCONNECT'

export const WS_CONNECTING = "WS_CONNECTING";
export const WS_CONNECTION_OPEN = 'WS_CONNECTION_OPEN';
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
export const WS_GET_ORDERS = 'WS_GET_ORDERS';
export const WS_SEND_ORDERS = 'WS_SEND_ORDERS';

export const connect = (teg) => ({
    type: LIVE_CONNECT,
    payload: `${WC_URL}/${teg}`
})
export const disconnect = () => ({
    type: LIVE_DISCONNECT
})