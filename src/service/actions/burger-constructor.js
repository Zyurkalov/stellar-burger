import { API_URL } from "../../constatnts/apiUrl";
import checkResponse from "../../utils/checkResponse";

import { CLEANING_INGREDIENT_LIST } from "./constructor";
export const AWAIT_ORDER = "AWAIT_ORDER";
export const MAKE_ORDER_SUCCES = "MAKE_ORDER_SUCCES";
export const MAKE_ORDER_FAILED = "MAKE_ORDER_FAILED";


export function makeOrderApi(value) {
  const data = { ingredients: value };
  return function (dispatch) {
    dispatch({ type: AWAIT_ORDER });
    fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        return checkResponse(res, dispatch, MAKE_ORDER_FAILED)
      })
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
