import request from "../../utils/request";
import { ingrOption } from "../../utils/fetch-option";
import { AWAIT_ORDER, MAKE_ORDER_SUCCESS, MAKE_ORDER_FAILED, CLEANING_INGREDIENT_LIST, MODAL_CLOSE } from "../../constatnts/actions";

import { AppDispatch } from "..";
import { NavigateFunction } from "react-router-dom";

export function makeOrderApi(value: string[] | number [], navigate: NavigateFunction, location: string ) {
  return function (dispatch: AppDispatch) {
    dispatch({ type: AWAIT_ORDER });
    request('orders', ingrOption.sendOrder(value))
      .then((data) => {
        dispatch({
            type: MAKE_ORDER_SUCCESS,
            orderNumber: data.order.number,
          });
        return data
      })
      .then((data) => navigate(`orders/${data.order.number}`, { state: {background: location} }))
      .then(() => {
        dispatch( {type: MODAL_CLOSE})
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
