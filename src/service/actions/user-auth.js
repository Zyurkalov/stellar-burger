import { api } from "../../utils/user-auth-api";
export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";
export const USER_REGISTER = "USER_REGISTER";
export const USER_LOADING = "USER_DATA_LOADING";

export const USER_AUTH_STATUS = "USER_AUTH_STATUS";
export const USER_DATA = "USER_DATA";

export const setAuthStatus = (bool) => ({
  type: USER_AUTH_STATUS,
  payload: bool,
});
export const setUserData = (data) => ({
  type: USER_DATA,
  payload: data,
});
export const userLogout = () => ({
  type: USER_LOGOUT,
});

export const login = (data) => {
  return (dispatch) => {
    return api
      .login(data)
      .then((res) => {
        if (res.success) {
          localStorage.setItem("accessToken", res.accessToken);
          localStorage.setItem("refreshToken", res.refreshToken);
          dispatch(setUserData(res.user));
          dispatch(setAuthStatus(true));
        }
      })
      .catch((err) => console.log(err));
  };
};
export const registration = (data) => {
  return (dispatch) => {
    return api
      .registration(data)
      .then((res) => {
        if (res.success) {
          localStorage.setItem("accessToken", res.accessToken);
          localStorage.setItem("refreshToken", res.refreshToken);
          dispatch(setUserData(res.user));
          dispatch(setAuthStatus(true));
        }
      })
      .catch((err) => console.log(err));
  };
};

export const logout = () => {
  return (dispatch) => {
    return api
      .logout()
      .then((res) => {
        if (res.success) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch(userLogout())
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getUser = () => {
  return (dispatch) => {
    return api.getUser().then((res) => {
    });
  };
};

export const checkUserAuth = () => {
  return (dispatch) => {
    if (localStorage.accessToken) {
      console.log('токен есть')
    return api.getUser()
      .then((res) => {
        console.log(res)
        dispatch(setUserData(res.user));
        dispatch(setAuthStatus(true));
      })
        .catch(() => {
          console.log('что то не так')
        })
    } else {
      console.log('нужно обновить токен')
    }
  }
}

export const editProfile = (inputForm) => {
    return (dispatch) => {
      return api.editProfile(inputForm)
      .then((res) => {
        dispatch(setUserData(res.user));
      })
      .catch(() => {
        console.log('что то не так')
      })
    }
  }