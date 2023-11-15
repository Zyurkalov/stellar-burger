export const MODAL_ORDER_OPEN = 'MODAL_ORDER_OPEN';
export const MODAL_INGR_OPEN = 'MODAL_INGR_OPEN';
export const MODAL_CLOSE = 'MODAL_CLOSE';
export const MODAL_ERROR_OPEN = 'MODAL_EROR_OPEN';
export const MODAL_LOADING = 'MODAL_LOADING';

export const openOrderModal = () => ({
    type: MODAL_ORDER_OPEN
})
export const openIngrModal = (ingr) => ({
    type: MODAL_INGR_OPEN,
    ingrList: ingr,
})
export const closeModal = () => ({
    type: MODAL_CLOSE
})
export const showModalError = (message) => ({
    type: MODAL_ERROR_OPEN,
    payload: message,
})
export const showLoading = (message) => ({
    type: MODAL_LOADING,
    payload: message,
})