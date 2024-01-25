
import request from "./request";
import { userOption } from "./fetch-option";
import { useCookie } from "./useCookie";
import { TRegistration, TUserAuth } from "../types";

const { getCookie, setCookie } = useCookie
const accessToken = getCookie("accessToken")

type TOption = {
  method?: string;
  headers: {
    "Content-Type": string;
    authorization?: string;
  };
  body?: string;
};
const optionGetUser: TOption = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    authorization: accessToken
  },
};
const optionEditProfile = (form: TUserAuth) => ({
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
    authorization: accessToken
  },
  body: JSON.stringify(form),
});

const registration = (data: TRegistration) => {
  return request("auth/register", userOption.registration(data));
};

const login = (data: TUserAuth) => {
  return request("auth/login", userOption.login(data));
};

const logout = () => {
  return request("auth/logout", userOption.logout());
};

const refreshToken = () => {
  return request("auth/token", userOption.refreshToken());
};
const fetchWithRefresh = async (options: TOption) => {
  try {
    return await request("auth/user", options);
  } catch (err: any) {
    if (err.message === "jwt expired") {
      const refresh = await refreshToken();
      if (refresh.success) {
        setCookie("refreshToken", refresh.refreshToken)
        setCookie("accessToken", refresh.accessToken)

        // options.headers.authorization = refresh.accessToken; //мутация?
        const updatedOptions = {
          ...options,
          headers: {
            ...options.headers,
            authorization: refresh.accessToken,
          },
        };
        return await request("auth/user", updatedOptions);
      }
    }
  }
};
const getUser = async () => {
  return await fetchWithRefresh(optionGetUser);
};
const editProfile = async (form: TRegistration) => {
  return await fetchWithRefresh(optionEditProfile(form));
};

const forgotPassword = (form: {email: string}) => {
  return request("password-reset", userOption.forgotPassword(form));
};

const passwordReset = (form: {password: string, token: string}) => {
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
