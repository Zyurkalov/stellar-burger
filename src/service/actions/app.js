import { API_URL } from "../../constatnts/apiUrl";

export const GET_DATA = "GET_DATA"
export const GET_DATA_SUCCESS = "GET_DATA_SUCCESS"
export const GET_DATA_FAILED = "GET_DATA_FAILED"

// export const getData = (data) => ({
//   type: GET_DATA,
//   payload: data,
// });

export function getApiData() {
  return function (dispatch) {
    dispatch({
      type: GET_DATA
    })
    fetch(`${API_URL}/ingredients`)
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          dispatch({
            type: GET_DATA_FAILED,
          })
        }
      })
      .then((data) => {
        const answer = data.data
        dispatch({
          type: GET_DATA_SUCCESS,
          feed: answer,
        })
      })
      .catch((err) =>
        dispatch({
          type: GET_DATA_FAILED,
          error: err
        }))
  }
}