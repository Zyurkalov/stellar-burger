import { WS_URL } from "../../constatnts/url";
import { wsAction } from "../../constatnts/ws";
import { TConnect, TDisconnect, TError } from "./types";

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