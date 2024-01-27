import { TIngredient } from "../../types";
import { AppDispatch } from "..";
import request from "../../utils/request";
import { AWAIT_DATA, GET_DATA_SUCCESS, GET_DATA_FAILED } from "../../constatnts/actions";

export function getIngredients() {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: AWAIT_DATA
    });
    // request("GET", 'ingredients')
    //   .then((res) => checkResponse(res))
    request('ingredients')
      .then((data: {success: boolean, data: TIngredient[]}) => {
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