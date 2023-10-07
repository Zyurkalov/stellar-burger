import { MODAL_ORDER_OPEN, MODAL_INGR_OPEN, MODAL_CLOSE } from "../actions/modal"
const initialState = {
    orderStatus: false,
    ingrStatus: false,
}

export const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case MODAL_ORDER_OPEN: {
            return {
                ...state,
                orderStatus: true,
            }
        }
        case MODAL_INGR_OPEN: {
            return {
                ...state,
                ingrStatus: true,
            }
        }
        case MODAL_CLOSE: {
            return {
                orderStatus: false,
                ingrStatus: false,
            }
        }
        default: return state
    }
    
}