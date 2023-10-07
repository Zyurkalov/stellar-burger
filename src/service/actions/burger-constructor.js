import { API_URL } from "../../constatnts/apiUrl";
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
        if (res.ok) {
            return res.json()
        } else {
          dispatch({ type: MAKE_ORDER_FAILED });
        }
      })
      .then((data) => {
        console.log(data.order.number)
        dispatch({
            type: MAKE_ORDER_SUCCES,
            number: data.order.number,
          });
      })
      .catch((err) => {
        dispatch({ type: MAKE_ORDER_FAILED, text: err });
      });
  };
}
