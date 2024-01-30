import { combineReducers } from "redux";
// import { createStore, combineReducers, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
// import { composeWithDevTools } from "redux-devtools-extension";
import { wsAction } from "../constatnts/ws";
import thunk from "redux-thunk";

import { getDataReducer } from "./reducers/app";
import { ingredientReducer } from "./reducers/constructor";
import { makeOrderReducer } from "./reducers/burger-constructor";
import { modalReducer } from "./reducers/modal";
import { switchTabReducer } from "./reducers/burger-ingredients";
import { authReducer } from "./reducers/user-auth";
import { wsReducer } from "./reducers/ws-reducer";
import { getOrderDetailsReducer } from "./reducers/order-number";
import { socketMiddleware } from "./middleware/socket-middleware";

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
// export const store = createStore(
//     rootReducer, composeWithDevTools( applyMiddleware(thunk, liveWcMiddleware))
// );
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(thunk, liveWcMiddleware),
  });
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
