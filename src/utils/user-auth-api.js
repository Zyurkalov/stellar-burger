import { checkResponse } from "./check-response ";

const URL = "https://norma.nomoreparties.space/api";
const AUTH_URL = `${URL}/auth/user`;

const optionGetUser = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    authorization: localStorage.getItem("accessToken"),
  },
};
const optionEditProfile = (form) => ({
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
    authorization: localStorage.getItem("accessToken"),
  },
  body: JSON.stringify(form),
});

const registration = (data) => {
  return fetch(`${URL}/auth/register`, {
    method: `POST`,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
      name: data.name,
    }),
  }).then(checkResponse);
};

const login = (data) => {
  return fetch(`${URL}/auth/login`, {
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
  }).then(checkResponse);
};

const logout = () => {
  return fetch(`${URL}/auth/logout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
  }).then(checkResponse);
};

const refreshToken = () => {
  return fetch(`${URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then(checkResponse);
};

const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refresh = await refreshToken(); //обновляем токен
      if (!refresh.success) {
        return Promise.reject(refresh);
      }
      localStorage.setItem("refreshToken", refresh.refreshToken);
      localStorage.setItem("accessToken", refresh.accessToken);
      options.headers.authorization = refresh.accessToken;
      const res = await fetch(url, options); //повторяем запрос
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};
const getUser = async() => {return await fetchWithRefresh(AUTH_URL, optionGetUser)}
const editProfile = async(inputForm) => {return await fetchWithRefresh(AUTH_URL, optionEditProfile(inputForm))}

const forgotPassword = (form) => {
  return fetch(`${URL}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  })
  .then(checkResponse)
};

const passwordReset = (form) => {
  return fetch(`${URL}/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  }).then(checkResponse);
};

export const api = {
  login,
  logout,
  registration,
  refreshToken,
  getUser,
  editProfile,
  forgotPassword,
  passwordReset,
};
