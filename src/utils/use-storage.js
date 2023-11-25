const addAll = (res) => {
    const userObject = {
        name: res.user.name,
        email: res.user.email
      };
    localStorage.setItem("accessToken", res.accessToken);
    localStorage.setItem("refreshToken", res.refreshToken);
    sessionStorage.setItem("user", JSON.stringify(userObject));
}
const addUser = (res) => {
    const userObject = {
        name: res.user.name,
        email: res.user.email
      };
    sessionStorage.setItem("user", JSON.stringify(userObject));
}
const remove = () => {
    localStorage.removeItem("LoggedIn");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    sessionStorage.removeItem("user")
}

export const useStorage = {
    addAll, 
    addUser,
    remove,
}