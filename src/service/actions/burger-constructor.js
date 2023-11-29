
import request from "../../utils/request";
import { ingrOption } from "../../utils/fetch-option";
import { CLEANING_INGREDIENT_LIST } from "./constructor";

export const AWAIT_ORDER = "AWAIT_ORDER";
export const MAKE_ORDER_SUCCES = "MAKE_ORDER_SUCCES";
export const MAKE_ORDER_FAILED = "MAKE_ORDER_FAILED";

export function makeOrderApi(value) {
  return function (dispatch) {
    dispatch({ type: AWAIT_ORDER });
    request('orders', ingrOption(value))
      .then((data) => {
        dispatch({
            type: MAKE_ORDER_SUCCES,
            orderNumber: data.order.number,
          });
      })
      .then(() => {
        dispatch({
            type: CLEANING_INGREDIENT_LIST
          });
      })
      .catch((err) => {
        dispatch({ type: MAKE_ORDER_FAILED, textErr: err });
      });
  };
}
