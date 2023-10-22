import { MODAL_ORDER_OPEN, MODAL_INGR_OPEN, MODAL_CLOSE } from "../actions/modal"
const initialState = {
    modalOrderStatus: false,
    modalIngrStatus: false,
    compIngr: {}
}

export const modalReducer = (state = initialState, action) => {
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
                modalOrderStatus: false,
                modalIngrStatus: false,
                compIngr: {},
            }
        }
        default: return state
    }
    
}