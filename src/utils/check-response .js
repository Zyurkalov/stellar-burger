import { API_URL } from "../constatnts/apiUrl";

export function checkResponse(res) {
  return res.ok
    ? res.json()
    : res.json().then((data) => Promise.reject(`Ошибка: ${data}`));
}
export function checkSuccess(res) {
  return res && res.success 
    ? res 
    : Promise.reject(`Ответ !res.success ${res}`);
}

export function checkResponseParam(res, dispatch, type) {
  if (res.ok) {
    return res.json();
  } else {
    dispatch({
      type: type,
    });
    return Promise.reject(`Ошибка ${res.status}`);
  }
}
