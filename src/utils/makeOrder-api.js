export function makeOrderApi(value) {
  const API_URL = "https://norma.nomoreparties.space/api";
  const data = { "ingredients": value };

  return fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Ответ с сервера не получен");
      }
      return res.json();
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
        console.error('Ошибка:', error);
      });
}


