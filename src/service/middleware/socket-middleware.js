import { showLoading, closeModal, showModalError } from "../actions/modal";
import { api } from "../../utils/user-api";
import { connect, disconnect } from "../actions/ws-action";
import { useCookie } from "../../utils/useCookie";
import { congrat } from "../../constatnts/congrat";

const {queryToken, setCookie, getCookie} = useCookie

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
          console.log(`ws соединение установлено`);
        };

        socket.onmessage = async (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch(closeModal());
          if (parsedData.message === "Invalid or missing token") {  
            dispatch(disconnect()) 
            //вернуть обратно:
            dispatch(showModalError(congrat))
            setTimeout(async () => {
              const refresh = await api.refreshToken(); 
              if (refresh.success) {
                setCookie("refreshToken", refresh.refreshToken);
                setCookie("accessToken", refresh.accessToken);
                dispatch(connect(`orders?token=${queryToken()}`));
              }
            }, 8*1000);
            // const refresh = await api.refreshToken(); 
            //   if (refresh.success) {
            //     setCookie("refreshToken", refresh.refreshToken);
            //     setCookie("accessToken", refresh.accessToken);
            //     dispatch(connect(`orders?token=${queryToken()}`));
            //   };
              
          } else {
            dispatch({ type: objAction.getMessage, payload: parsedData });
          }
        };

        socket.onclose = (event) => {
          dispatch({ type: objAction.closed });
          if (/*event.wasClean*/ closing) {
            console.log(`ws соединение закрыто корректно`);
          } else {
            console.log(`Непредвиденное закрытие ws соединения`);
            setTimeout(() => {
              dispatch(connect(`orders?token=${queryToken()}`))
            }, 3000)
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
