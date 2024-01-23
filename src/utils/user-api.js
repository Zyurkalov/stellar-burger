
import request from "./request";
import { userOption } from "./fetch-option";
import { useCookie } from "./useCookie";

const { getCookie, setCookie } = useCookie
const accessToken = getCookie("accessToken")

const optionGetUser = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    authorization: accessToken
  },
};
const optionEditProfile = (form) => ({
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
    authorization: accessToken
  },
  body: JSON.stringify(form),
});

const registration = (data) => {
  return request("auth/register", userOption.registration(data));
};

const login = (data) => {
  return request("auth/login", userOption.login(data));
};

const logout = () => {
  return request("auth/logout", userOption.logout());
};

const refreshToken = () => {
  return request("auth/token", userOption.refreshToken());
};
const fetchWithRefresh = async (options) => {
  try {
    return await request("auth/user", options);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refresh = await refreshToken();
      if (refresh.success) {
        setCookie("refreshToken", refresh.refreshToken)
        setCookie("accessToken", refresh.accessToken)

        options.headers.authorization = refresh.accessToken;
        return await request("auth/user", options);
      }
    }
  }
};
const getUser = async () => {
  return await fetchWithRefresh(optionGetUser);
};
const editProfile = async (form) => {
  return await fetchWithRefresh(optionEditProfile(form));
};

const forgotPassword = (form) => {
  return request("password-reset", userOption.forgotPassword(form));
};

const passwordReset = (form) => {
  return request("password-reset/reset", userOption.resetPassword(form));
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
