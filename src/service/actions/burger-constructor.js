
import request from "../../utils/request";
import { checkResponseParam } from "../../utils/check-response ";

import { CLEANING_INGREDIENT_LIST } from "./constructor";
export const AWAIT_ORDER = "AWAIT_ORDER";
export const MAKE_ORDER_SUCCES = "MAKE_ORDER_SUCCES";
export const MAKE_ORDER_FAILED = "MAKE_ORDER_FAILED";

export function makeOrderApi(value) {
  return function (dispatch) {
    dispatch({ type: AWAIT_ORDER });
    request("POST", 'orders', value )
      .then((res) =>checkResponseParam(res, dispatch, MAKE_ORDER_FAILED))
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
