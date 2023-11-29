export const ingrOption = (value) => ({
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ingredients: value }),
  });

  export const userOption = (value) => ({
    
  })