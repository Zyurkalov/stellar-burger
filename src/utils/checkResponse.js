export default function checkResponse(res, dispatch, type) {
    if (res.ok) {
      return res.json();
    } else {
      dispatch({
        type: type,
      });
      return Promise.reject(`Ошибка ${res.status}`);
    }
  }