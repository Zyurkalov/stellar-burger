import { TIngredient } from "../../types";

export const MODAL_ORDER_OPEN: 'MODAL_ORDER_OPEN' = 'MODAL_ORDER_OPEN';
export const MODAL_INGR_OPEN: 'MODAL_INGR_OPEN' = 'MODAL_INGR_OPEN';
export const MODAL_CLOSE: 'MODAL_CLOSE' = 'MODAL_CLOSE';
export const MODAL_ERROR_OPEN: 'MODAL_EROR_OPEN' = 'MODAL_EROR_OPEN';
export const MODAL_LOADING: 'MODAL_LOADING' = 'MODAL_LOADING';

type TCloseModal = {
    readonly type: typeof MODAL_CLOSE
}
type TOpenOrderModal = {
    readonly type: typeof MODAL_ORDER_OPEN
}
type TOpenIngrModal = {
    readonly type: typeof MODAL_INGR_OPEN;
    readonly ingrList: TIngredient;
}
type TShowModalError = {
    readonly type: typeof MODAL_ERROR_OPEN;
    readonly payload: string,
}
type TShowLoading = {
    readonly type: typeof MODAL_LOADING;
    readonly payload: string;
}
export type TypeModalAction = TCloseModal | TOpenOrderModal | TOpenIngrModal | TShowModalError | TShowLoading;

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