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
    return fetch(`https://norma.nomoreparties.space/api/${urlTeg}`, method(value))
  }