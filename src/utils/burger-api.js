const API_URL = "https://norma.nomoreparties.space/api";

function getIngrApi() {
  return fetch(`${API_URL}/ingredients`) // Return the fetch promise
  .then((res) => {
    if (!res.ok) {
      throw new Error('Ответ с сервера не получен');
    }
    return res.json(); // Parse the response as JSON
  });
}

export default  getIngrApi