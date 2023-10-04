import {createStore, combineReducers} from "redux"
import {ingredientsCountReducer} from "../reducers/ingredientsCountReducer"
import { composeEnhancers } from "../../utils/reduxDevTools"
import { getDataReducer } from "./getData";

// альтернативный путь, через внешний импорт
// import { composeWithDevTools } from '@redux-devtools/extension';
// const enhancer = composeWithDevTools(); 

const enhancer = composeEnhancers();

const rootReducer = combineReducers({
    ingrCount: ingredientsCountReducer,
    dataList: getDataReducer,
})
export const store = createStore(rootReducer, enhancer)