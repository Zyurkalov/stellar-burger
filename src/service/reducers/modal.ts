import { TIngredient } from "../../types"
import { MODAL_ORDER_OPEN, MODAL_INGR_OPEN, MODAL_CLOSE, MODAL_LOADING, MODAL_ERROR_OPEN } from "../actions/modal"
import { TypeModalAction as TAction } from "../actions/modal"
import { TInitialStateModal as TReducer } from "./types"

const initialState: TReducer = {
    modalOrderStatus: false,
    modalIngrStatus: false,
    modalLoadingStatus: false,
    modalErrorStatus: false,
    compIngr: {},
    loadingMessage: '',
    errorMessage: '',
}

export const modalReducer = (state = initialState, action: TAction): TReducer => {
    switch (action.type) {
        case MODAL_ORDER_OPEN: {
            return {
                ...state,
                modalOrderStatus: true,
            }
        }
        case MODAL_INGR_OPEN: {
            return {
                ...state,
                modalIngrStatus: true,
                compIngr: action.ingrList
            }
        }
        case MODAL_CLOSE: {
            return {
                ...state,
                modalOrderStatus: false,
                modalIngrStatus: false,
                modalLoadingStatus: false,
                modalErrorStatus: false,
                compIngr: {},
                loadingMessage: '',
                errorMessage: '',
            }  
        }
        case MODAL_ERROR_OPEN: {
            return {
                ...state,
                modalErrorStatus: true,
                errorMessage: action.payload,
            }
        }
        case MODAL_LOADING: {
            return {
                ...state,
                modalLoadingStatus: true,
                loadingMessage: action.payload,
            }
        }
        default: return state
    }
    
}