import { API_URL } from "../constatnts/url"

function checkResponse(res: Response) {
  return res.ok
    ? res.json()
    : res.json().then((data) => Promise.reject(data));
}
function checkSuccess<T extends { success: boolean }>(res: T) {
  return res && res.success 
    ? res 
    : Promise.reject(res);
}

  export default function request (endpoint: string, option = {}) {
    return fetch(`${API_URL}${endpoint}`, option)
    .then(checkResponse)
    .then(checkSuccess)
  }
