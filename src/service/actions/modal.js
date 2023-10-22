export const MODAL_ORDER_OPEN = 'MODAL_ORDER_OPEN';
export const MODAL_INGR_OPEN = 'MODAL_INGR_OPEN';
export const MODAL_CLOSE = 'MODAL_CLOSE';

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