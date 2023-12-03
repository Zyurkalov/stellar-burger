import { useCookie } from "./useCookie";

const addAll = (res) => {
    localStorage.setItem("accessToken", res.accessToken);
    localStorage.setItem("refreshToken", res.refreshToken);
    sessionStorage.setItem("name", res.user.name);
    sessionStorage.setItem("email", res.user.email);
    // useCookie.setCookie("accessToken", res.accessToken)
    // useCookie.setCookie("refreshToken", res.refreshToken)
}
const addUser = (res) => {
    sessionStorage.setItem("name", res.user.name);
    sessionStorage.setItem("email", res.user.email);
}
const remove = () => {
    // localStorage.removeItem("LoggedIn");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("email");
}

export const useStorage = {
    addAll, 
    addUser,
    remove,
}