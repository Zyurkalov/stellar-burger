import { TRegistration, TUserAuth } from "../types";
import { useCookie } from "./useCookie";
const { getCookie } = useCookie

//// значения объекта ingrOption
const sendOrder = (value: string[] | number []) => ({
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "authorization": getCookie('accessToken')
  },
  body: JSON.stringify({ ingredients: value }),
});

//// значения объекта userOption
const registration = (data: TRegistration) => ({
  method: `POST`,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: data.email,
    password: data.password,
    name: data.name,
  }),
});
const login = (data: TUserAuth) => ({
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
const forgotPassword = (data: {email: string}) => ({
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
});
const resetPassword = (data: {password: string, token: string}) => ({
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
