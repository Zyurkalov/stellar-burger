export function checkReponse(res) {
    return res.ok ? res.json() : res.json().then((data) => Promise.reject(data));
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