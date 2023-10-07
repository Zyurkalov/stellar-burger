import { API_URL } from "../constatnts/apiUrl";

function getIngrApi() {
  return fetch(`${API_URL}/ingredients`)
  .then((res) => {
    if (!res.ok) {
      throw new Error('Ответ с сервера не получен');
    }
    return res.json();
  });
}

export default  getIngrApi