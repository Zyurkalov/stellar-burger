// import { AWAIT_DATA, GET_DATA_SUCCESS, GET_DATA_FAILED } from "../../constatnts/actions";
import { TIngredient } from "../../Types";
import { AppDispatch } from "../reducers";
import request from "../../utils/request";

export const AWAIT_DATA: "AWAIT_DATA" = "AWAIT_DATA"
export const GET_DATA_SUCCESS: "GET_DATA_SUCCESS" = "GET_DATA_SUCCESS"
export const GET_DATA_FAILED: "GET_DATA_FAILED" = "GET_DATA_FAILED"

export type AwaitData = {
  readonly type: typeof AWAIT_DATA
}
export type DataSuccess = {
  readonly type: typeof GET_DATA_SUCCESS;
  readonly feed: TIngredient[];
}
export type DataFailed = {
  readonly type: typeof GET_DATA_FAILED;
  readonly error: string;
}
export type TAppAction = AwaitData | DataSuccess | DataFailed;

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