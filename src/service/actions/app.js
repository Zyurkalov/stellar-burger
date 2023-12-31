
import request from "../../utils/request";

export const AWAIT_DATA = "AWAIT_DATA"
export const GET_DATA_SUCCESS = "GET_DATA_SUCCESS"
export const GET_DATA_FAILED = "GET_DATA_FAILED"

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: AWAIT_DATA
    });
    // request("GET", 'ingredients')
    //   .then((res) => checkResponse(res))
    request('ingredients')
      .then((data) => {
        const answer = data.data;
        dispatch({
          type: GET_DATA_SUCCESS,
          feed: answer,
        });
        return answer
      })
      .catch((err) =>
        dispatch({
          type: GET_DATA_FAILED,
          error: err,
        })
      );
  }
}