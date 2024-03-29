import request from "../../utils/request";
import { ingrOption } from "../../utils/fetch-option";
import { AWAIT_ORDER, MAKE_ORDER_SUCCESS, MAKE_ORDER_FAILED, CLEANING_INGREDIENT_LIST } from "../../constatnts/actions";

import { AppDispatch } from "..";

export function makeOrderApi(value: string[] | number []) {
  return function (dispatch: AppDispatch) {
    dispatch({ type: AWAIT_ORDER });
    request('orders', ingrOption.sendOrder(value))
      .then((data) => {
        dispatch({
            type: MAKE_ORDER_SUCCESS,
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
