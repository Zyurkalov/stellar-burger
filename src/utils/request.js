import { API_URL } from "../constatnts/apiUrl"

export default function request (type, urlTeg, value) {
    const method = (value) => (
      type === "POST" ? {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredients: value }),
      
    } : type === "GET" ? {
      method: "GET",
      headers: { "Content-Type": "application/json" },
  
    } : null
    )
    return fetch(`${API_URL}/${urlTeg}`, method(value))
  }

  // export const requestTwo = (url, option) => {
  //   return fetch(url, option).then(checkResponse)

  // }