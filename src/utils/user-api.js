
import request from "./request";
import { userOption } from "./fetch-option";

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
  return request("auth/register", userOption.registration(data));
  // return fetch(`${API_URL}auth/register`, {
  //   method: `POST`,
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({
  //     email: data.email,
  //     password: data.password,
  //     name: data.name,
  //   }),
  // }).then(checkResponse);
};

const login = (data) => {
  return request("auth/login", userOption.login(data));
  // return fetch(`${API_URL}auth/login`, {
  //   method: `POST`,
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     email: data.email,
  //     password: data.password,
  //   }),
  // }).then(checkResponse);
};

const logout = () => {
  return request("auth/logout", userOption.logout());
  // return fetch(`${API_URL}auth/logout`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
  // }).then(checkResponse);
};

const refreshToken = () => {
  return request("auth/token", userOption.refreshToken());
  // return fetch(`${API_URL}auth/token`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     token: localStorage.getItem("refreshToken"),
  //   }),
  // }).then(checkResponse);
};

// const fetchWithRefresh = async (url, options) => {
//   try {
//     return request('auth/user', options)
//     const res = await fetch(url, options);
//     return await checkResponse(res);
//   } catch (err) {
//     if (err.message === "jwt expired") {
//       const refresh = await refreshToken(); //обновляем токен
//       console.log(refresh)
//       if (!refresh.success) {
//         return Promise.reject(refresh);
//       }
//       localStorage.setItem("refreshToken", refresh.refreshToken);
//       localStorage.setItem("accessToken", refresh.accessToken);
//       options.headers.authorization = refresh.accessToken;
//       const res = await fetch(url, options); //повторяем запрос
//       return await checkResponse(res);
//     } else {
//       return Promise.reject(err);
//     }
//   }
// };
const fetchWithRefresh = async (options) => {
  try {
    return await request("auth/user", options);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refresh = await refreshToken();
      if (refresh.success) {
        localStorage.setItem("refreshToken", refresh.refreshToken);
        localStorage.setItem("accessToken", refresh.accessToken);
        options.headers.authorization = refresh.accessToken;
        return await request("auth/user", options);
      }
    }
  }
};

const getUser = async () => {
  return await fetchWithRefresh(optionGetUser);
};
const editProfile = async (inputForm) => {
  return await fetchWithRefresh(optionEditProfile(inputForm));
};

const forgotPassword = (form) => {
  return request("password-reset", userOption.forgotPassword(form));
  // return fetch(`${API_URL}password-reset`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(form),
  // })
  // .then(checkResponse)
};

const passwordReset = (form) => {
  return request("password-reset/reset", userOption.passwordReset(form));
  // return fetch(`${API_URL}password-reset/reset`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(form),
  // }).then(checkResponse);
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
