import request from "../../utils/request";
import { ingrOption } from "../../utils/fetch-option";
import { CLEANING_INGREDIENT_LIST } from "./constructor";

import { AppDispatch } from "../reducers";

export const AWAIT_ORDER: "AWAIT_ORDER" = "AWAIT_ORDER";
export const MAKE_ORDER_SUCCESS: "MAKE_ORDER_SUCCESS" = "MAKE_ORDER_SUCCESS";
export const MAKE_ORDER_FAILED: "MAKE_ORDER_FAILED" = "MAKE_ORDER_FAILED";

type TOrderAwait = {
  readonly type: typeof AWAIT_ORDER;
}
type TOrderSuccess = {
  readonly type: typeof MAKE_ORDER_SUCCESS;
  readonly orderNumber: number;
}
type TOrderFailed = {
  readonly type: typeof MAKE_ORDER_FAILED;
  readonly textErr: string;
}

export type TBurgerAction = TOrderAwait | TOrderSuccess | TOrderFailed;


export function makeOrderApi(value: string[]) {
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
