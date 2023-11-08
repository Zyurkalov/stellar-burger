export const USER_LOGIN = 'USER_LOGIN'
export const USER_LOGOUT = 'USER_LOGOUT'

export const login = (value) => ({
    type: USER_LOGIN,
    payload: value,
})

export const logout = (value) => ({
    type: USER_LOGOUT,
    payload: value,
})