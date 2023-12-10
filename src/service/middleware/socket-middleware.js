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

export function socketMiddleware() {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
      const { type } = action;
      const { dispatch } = store;

      if (type === LIVE_CONNECT) {
        console.log(action.payload)
        socket = new WebSocket(action.payload);
        dispatch({ type: WS_CONNECTING });
      }
      if (socket) {
        socket.open = () => {
          dispatch({ type: WS_CONNECTION_OPEN });
          console.log(`wc соединение установлено`);
        };
        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch({ type: WS_GET_ORDERS, payload: parsedData });
          // if (data === "ping") {
          //   socket.send("pong");
          // } else {
          //   dispatch({ type: WS_GET_ORDERS, payload: parsedData });
          // }
        };
        socket.onclose = (event) => {
          dispatch({ type: WS_CONNECTION_CLOSED });
          if (event.wasClean) {
            console.log(`wc соединение закрыто корректно`);
            // console.log(`Код закрытия: ${event.code}`);
            // console.log(`Причина: ${event.reason}`);
          } else {
            console.log(`Непредвиденное закрытие wc соединения`);
            // console.log(`Код закрытия: ${event.code}`);
            // console.log(`Причина: ${event.reason}`);
          }
        };
        socket.onerror = (event) => {
          dispatch({ type: WS_CONNECTION_ERROR, payload: "Error" });
          console.log(`Ошибка соединения: ${event.message}`);
        };
        if (type === WS_SEND_ORDERS) {
          socket.send(JSON.stringify(action.payload));
        }
        if (type === LIVE_DISCONNECT) {
          socket.close();
          socket = null;
        }
      }
      next(action);
    };
  };
}
