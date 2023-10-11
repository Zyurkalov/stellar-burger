import { API_URL } from "../../constatnts/apiUrl";
import checkResponse from "../../utils/checkResponse";

export const AWAIT_DATA = "AWAIT_DATA"
export const GET_DATA_SUCCESS = "GET_DATA_SUCCESS"
export const GET_DATA_FAILED = "GET_DATA_FAILED"

export function getApiData() {
  return function (dispatch) {
    dispatch({
      type: AWAIT_DATA
    });
    fetch(`${API_URL}/ingredients`)
      .then((res) => {
        return checkResponse(res, dispatch, GET_DATA_FAILED );
      })
      .then((data) => {
        const answer = data.data;
        dispatch({
          type: GET_DATA_SUCCESS,
          feed: answer,
        });
      })
      .catch((err) =>
        dispatch({
          type: GET_DATA_FAILED,
          error: err,
        })
      );
  }
}