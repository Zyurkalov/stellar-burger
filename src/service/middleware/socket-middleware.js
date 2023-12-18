import { showLoading, closeModal } from "../actions/modal";
import { api } from "../../utils/user-api";
import { connect } from "../actions/ws-action";
import { useCookie } from "../../utils/useCookie";

const {queryToken, setCookie} = useCookie

export const socketMiddleware = (objAction)  => {
  return (store) => {
    let socket = null;
    let closing = false;
    let url = "";

    return (next) => (action) => {
      const { type, payload } = action;
      const { dispatch } = store;
      url = payload;

      if (type === objAction.connect) {
        socket = new WebSocket(url);
        dispatch({ type: objAction.connecting });
        dispatch(showLoading('загружаем даные'))
      }
      if (socket) {
        socket.onopen = () => {
          dispatch({ type: objAction.open });
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
            dispatch({ type: objAction.getMessage, payload: parsedData });
          }
        };

        socket.onclose = (event) => {
          const { data } = event;
          dispatch({ type: objAction.closed });
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
          dispatch({ type: objAction.error, payload: data?.message });
          console.log(`Ошибка соединения: ${event.message}`);
        };

        if (type === objAction.sendMessage) {
          socket.send(JSON.stringify(action.payload));
        }
        if (type === objAction.disconnect) {
          closing = true;
          socket.close();
          socket = null;
        }
      }
      next(action);
    };
  };
}
