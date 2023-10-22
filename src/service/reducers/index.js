import {createStore, combineReducers, applyMiddleware} from "redux"
import thunk from "redux-thunk";

import { getDataReducer } from "./app";
import { ingredientReducer } from "./constructor";
import { makeOrderReducer } from "./burger-constructor";
import { modalReducer } from "./modal";
import { switchTabReducer } from "./burger-ingredients";

// альтернативный путь, через внешний импорт
// import { composeWithDevTools } from '@redux-devtools/extension';
// const enhancer = composeWithDevTools(); 

// const enhancer = composeEnhancers(applyMiddleware());

const rootReducer = combineReducers({
    dataList: getDataReducer,
    ingrList: ingredientReducer,
    makeOrder: makeOrderReducer,
    modal: modalReducer,
    tab: switchTabReducer 
})
export const store = createStore(rootReducer, applyMiddleware(thunk))