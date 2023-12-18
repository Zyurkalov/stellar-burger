import { createStore, combineReducers, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import { wsAction } from "../actions/ws-action";
import thunk from "redux-thunk";

import { getDataReducer } from "./app";
import { ingredientReducer } from "./constructor";
import { makeOrderReducer } from "./burger-constructor";
import { modalReducer } from "./modal";
import { switchTabReducer } from "./burger-ingredients";
import { authReducer } from "./user-auth";
import { wsReducer } from "./ws-reducer";
import { getOrderDetailsReducer } from "./order-number";
import { socketMiddleware } from "../middleware/socket-middleware";

const liveWcMiddleware = socketMiddleware(wsAction);

const rootReducer = combineReducers({
  dataList: getDataReducer,
  ingrList: ingredientReducer,
  makeOrder: makeOrderReducer,
  getOrderNumber: getOrderDetailsReducer,
  modal: modalReducer,
  tab: switchTabReducer,
  user: authReducer,
  ws: wsReducer,
});
export const store = createStore(
    rootReducer, composeWithDevTools( applyMiddleware(thunk, liveWcMiddleware))
);
// export const store = configureStore({
//     reducer: rootReducer,
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware().concat(thunk, liveTableMiddleware),
//   });
  
