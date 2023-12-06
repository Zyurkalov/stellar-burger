import { API_URL } from "../constatnts/apiUrl"

function checkResponse(res) {
  return res.ok
    ? res.json()
    : res.json().then((data) => Promise.reject(data));
}
function checkSuccess(res) {
  return res && res.success 
    ? res 
    : Promise.reject(res);
}

  export default function request (endpoint, option={}) {
    return fetch(`${API_URL}${endpoint}`, option)
    .then(checkResponse)
    .then(checkSuccess)
  }
