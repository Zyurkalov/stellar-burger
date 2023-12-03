import { useCookie } from "./useCookie";
const { getCookie } = useCookie

//// значения объекта ingrOption
const sendOrder = (value) => ({
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ ingredients: value }),
});

//// значения объекта userOption
const registration = (data) => ({
  method: `POST`,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: data.email,
    password: data.password,
    name: data.name,
  }),
});
const login = (data) => ({
  method: `POST`,
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    email: data.email,
    password: data.password,
  }),
});
const logout = () => ({
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ token: getCookie("refreshToken") }),
});
const refreshToken = () => ({
  method: "POST",
  headers: {
    "Content-Type": "application/json"},
  body: JSON.stringify({ token: getCookie("refreshToken") }),
});
const forgotPassword = (data) => ({
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
});
const resetPassword = (data) => ({
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
});

export const ingrOption = {
  sendOrder,
};
export const userOption = {
  registration,
  login,
  logout,
  refreshToken,
  forgotPassword,
  resetPassword,
};
