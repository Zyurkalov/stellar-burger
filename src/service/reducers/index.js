import {createStore, combineReducers, applyMiddleware} from "redux"
import thunk from "redux-thunk";
import {ingredientsCountReducer} from "./ingredientsCount"
import { composeEnhancers } from "../../utils/reduxDevTools"
import { getDataReducer } from "./app";
import { ingredientReducer } from "./constructor";
import { makeOrderReducer } from "./burger-constructor";
import { modalReducer } from "./modal";

// альтернативный путь, через внешний импорт
// import { composeWithDevTools } from '@redux-devtools/extension';
// const enhancer = composeWithDevTools(); 

// const enhancer = composeEnhancers(applyMiddleware());

const rootReducer = combineReducers({
    dataList: getDataReducer,
    ingrCount: ingredientsCountReducer,
    ingrList: ingredientReducer,
    makeOrder: makeOrderReducer,
    modal: modalReducer,
})
export const store = createStore(rootReducer, applyMiddleware(thunk))