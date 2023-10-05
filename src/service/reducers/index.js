import {createStore, combineReducers} from "redux"
import {ingredientsCountReducer} from "./ingredientsCount"
import { composeEnhancers } from "../../utils/reduxDevTools"
import { getDataReducer } from "./app";
import { ingredientReducer } from "./constructor";

// альтернативный путь, через внешний импорт
// import { composeWithDevTools } from '@redux-devtools/extension';
// const enhancer = composeWithDevTools(); 

const enhancer = composeEnhancers();

const rootReducer = combineReducers({
    dataList: getDataReducer,
    ingrCount: ingredientsCountReducer,
    ingrList: ingredientReducer,
})
export const store = createStore(rootReducer, enhancer)