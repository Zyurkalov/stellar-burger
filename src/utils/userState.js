const addUser = (res) => {
    sessionStorage.setItem("name", res.user.name);
    sessionStorage.setItem("email", res.user.email);
}
const removeUser = () => {
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("email");
}
export const userState = {
    addUser,
    removeUser,
}