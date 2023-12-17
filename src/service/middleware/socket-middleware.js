import {
  LIVE_CONNECT,
  LIVE_DISCONNECT,
  WS_CONNECTING,
  WS_CONNECTION_OPEN,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_GET_ORDERS,
  WS_SEND_ORDERS,
} from "../actions/wc-action";
import { showLoading, closeModal } from "../actions/modal";
import { api } from "../../utils/user-api";
import { connect } from "../actions/wc-action";
import { useCookie } from "../../utils/useCookie";

const {queryToken, setCookie} = useCookie

export function socketMiddleware() {
  return (store) => {
    let socket = null;
    let closing = false;
    let url = "";

    return (next) => (action) => {
      const { type, payload } = action;
      const { dispatch } = store;
      url = payload;

      if (type === LIVE_CONNECT) {
        socket = new WebSocket(url);
        dispatch({ type: WS_CONNECTING });
        dispatch(showLoading('загружаем даные'))
      }
      if (socket) {
        socket.onopen = () => {
          dispatch({ type: WS_CONNECTION_OPEN });
          console.log(`wc соединение установлено`);
        };

        socket.onmessage = async (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch(closeModal());

          if (parsedData.message === "Invalid or missing token") {   
            const refresh = await api.refreshToken(); 
              if (refresh.success) {
                setCookie("refreshToken", refresh.refreshToken);
                setCookie("accessToken", refresh.accessToken);
                socket.close();
                dispatch(connect(`orders?token=${queryToken()}`));
              };
          } else {
            dispatch({ type: WS_GET_ORDERS, payload: parsedData });
          }
        };

        socket.onclose = (event) => {
          const { data } = event;
          dispatch({ type: WS_CONNECTION_CLOSED });
          if (/*event.wasClean*/ closing) {
            console.log(`wc соединение закрыто корректно`);
          } else {
            console.log(`Непредвиденное закрытие wc соединения`);
            dispatch(connect(`orders?token=${queryToken()}`));
            // dispatch({ type: LIVE_CONNECT, payload: url });
          }
        };

        socket.onerror = (event) => {
          const { data } = event;
          dispatch({ type: WS_CONNECTION_ERROR, payload: data?.message });
          console.log(`Ошибка соединения: ${event.message}`);
        };

        if (type === WS_SEND_ORDERS) {
          socket.send(JSON.stringify(action.payload));
        }
        if (type === LIVE_DISCONNECT) {
          closing = true;
          socket.close();
          socket = null;
        }
      }
      next(action);
    };
  };
}
