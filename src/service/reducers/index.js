import { createStore, combineReducers, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { getDataReducer } from "./app";
import { ingredientReducer } from "./constructor";
import { makeOrderReducer } from "./burger-constructor";
import { modalReducer } from "./modal";
import { switchTabReducer } from "./burger-ingredients";
import { authReducer } from "./user-auth";
import { wcReducer } from "./wc-reducer";
import { getOrderDetailsReducer } from "./order-number";
import { socketMiddleware } from "../middleware/socket-middleware";

const liveWcMiddleware = socketMiddleware();

const rootReducer = combineReducers({
  dataList: getDataReducer,
  ingrList: ingredientReducer,
  makeOrder: makeOrderReducer,
  getOrderNumber: getOrderDetailsReducer,
  modal: modalReducer,
  tab: switchTabReducer,
  user: authReducer,
  wc: wcReducer,
});
export const store = createStore(
    rootReducer, composeWithDevTools( applyMiddleware(thunk, liveWcMiddleware))
);
// export const store = configureStore({
//     reducer: rootReducer,
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware().concat(thunk, liveTableMiddleware),
//   });
  
