import { showLoading, closeModal } from "../actions/modal";
// import { showLoading, closeModal, showModalError } from "../actions/modal";
import { api } from "../../utils/user-api";
import { connect, disconnect} from "../actions/ws-action";
import { wsAction } from "../../constatnts/actions";
import { useCookie } from "../../utils/useCookie";
import { Middleware } from "redux";
import { isErrorEvent } from "../../utils/isErrorEvent";

const { queryToken, setCookie } = useCookie
// const {queryToken, setCookie, getCookie} = useCookie

export const socketMiddleware = (objAction: typeof wsAction): Middleware  => {
  return (store) => {
    let socket: WebSocket | null = null;
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
          console.log(`ws соединение установлено`);
        };

        socket.onmessage = async (event: MessageEvent<string>) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch(closeModal());
          if (parsedData.message === "Invalid or missing token") { 
            dispatch(disconnect()) 
            const refresh = await api.refreshToken(); 
              if (refresh.success) {
                setCookie("refreshToken", refresh.refreshToken);
                setCookie("accessToken", refresh.accessToken);
                await dispatch(connect(`orders?token=${queryToken()}`));
              };  
          } else {
            dispatch({ type: objAction.getMessage, payload: parsedData });
          }
        };

        socket.onclose = () => {
          dispatch({ type: objAction.closed });
          if (/*event.wasClean*/ closing) {
            console.log(`ws соединение закрыто корректно`);
          } else {
            console.log(`Непредвиденное закрытие ws соединения`);
            setTimeout(() => {
              dispatch(connect(`orders?token=${queryToken()}`))
            }, 2000)
          }
        };

        socket.onerror = (event: Event | ErrorEvent) => {
          // const { data } = event;
          // dispatch({ type: objAction.error, payload: data?.message });
          // console.log(`Ошибка соединения: ${event.message}`);
          if (isErrorEvent(event)) {
            const errorEvent = event as ErrorEvent;
            const { message } = errorEvent;
            dispatch({ type: objAction.error, payload: message });
            console.log(`Connection error: ${message}`);
          }
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