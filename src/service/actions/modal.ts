import { TIngredient } from "../../types";
import { MODAL_ORDER_OPEN, MODAL_INGR_OPEN, MODAL_CLOSE, MODAL_ERROR_OPEN, MODAL_LOADING } from "../../constatnts/actions";

export const openOrderModal = () => ({
    type: MODAL_ORDER_OPEN
})
export const openIngrModal = (ingr: TIngredient) => ({
    type: MODAL_INGR_OPEN,
    ingrList: ingr,
})
export const closeModal = () => ({
    type: MODAL_CLOSE
})
export const showModalError = (message: string) => ({
    type: MODAL_ERROR_OPEN,
    payload: message,
})
export const showLoading = (message: string) => ({
    type: MODAL_LOADING,
    payload: message,
})