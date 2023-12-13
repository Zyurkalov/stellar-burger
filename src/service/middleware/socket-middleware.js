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
        socket = new WebSocket(action.payload);
        dispatch({ type: WS_CONNECTING });
      }
      if (socket) {
        socket.onopen = () => {
          dispatch({ type: WS_CONNECTION_OPEN });
          console.log(`wc соединение установлено`);
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch({ type: WS_GET_ORDERS, payload: parsedData });
        };

        socket.onclose = (event) => {
          dispatch({ type: WS_CONNECTION_CLOSED });
          if (event.wasClean) {
            console.log(`wc соединение закрыто корректно`);
          } else {
            console.log(`Непредвиденное закрытие wc соединения`);
            console.log(event)
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
          socket.close(1000, 'переход пользователем, на другую страницу');
          socket = null;
        }
      }
      next(action);
    };
  };
}
