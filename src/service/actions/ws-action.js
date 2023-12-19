import { WS_URL } from "../../constatnts/apiUrl";

// const LIVE_CONNECT = 'LIVE_CONNECT'
// const LIVE_DISCONNECT = 'LIVE_DISCONNECT'

// const WS_CONNECTING = "WS_CONNECTING";
// const WS_CONNECTION_OPEN = 'WS_CONNECTION_OPEN';
// const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';
// const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
// const WS_GET_MESSAGE = 'WS_GET_MESSAGE';
// const WS_SEND_MESSAGE = 'WS_SEND_MESSAGE';

export const wsAction = {
    connect: 'LIVE_CONNECT', 
    disconnect: 'LIVE_DISCONNECT',
    connecting: "WS_CONNECTING",
    open: 'WS_CONNECTION_OPEN',
    closed: 'WS_CONNECTION_CLOSED',
    error: 'WS_CONNECTION_ERROR',
    getMessage: 'WS_GET_MESSAGE',
    sendMessage: 'WS_SEND_MESSAGE',
}

export const connect = (teg) => ({
    type: wsAction.connect,
    payload: `${WS_URL}/${teg}`
})
export const disconnect = () => ({
    type: wsAction.disconnect
})