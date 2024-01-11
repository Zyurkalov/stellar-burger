import { api } from "../../utils/user-api";
import { userState } from "../../utils/userState";
import { useCookie } from "../../utils/useCookie";
import { closeModal, showLoading, showModalError } from "./modal";

const { getCookie, setCookie, deleteCookie } = useCookie
const { addUser, removeUser } = userState
const refreshToken = getCookie("refreshToken")

export const USER_LOGOUT = "USER_LOGOUT";
export const USER_LOADING = "USER_DATA_LOADING";
export const LOADING_STATUS ='LOADING_STATUS'
export const USER_DATA = "USER_DATA";

export const setUserData = (data) => ({
  type: USER_DATA,
  payload: data,
});
export const userLogout = () => ({
  type: USER_LOGOUT,
});
export const loadingStatus = (type) => ({
  type: LOADING_STATUS,
  payload: type
})
// в запросах, |* служит обозначением красной строки для текста 
export const login = (data) => {
  return (dispatch) => {
    dispatch(showLoading('стыковка...'))
    return api
      .login(data)
      .then((res) => {
        if (res.success) {
          addUser(res)
          setCookie("accessToken", res.accessToken)
          setCookie("refreshToken", res.refreshToken, {expires: 15})
          dispatch(setUserData(res.user));
        }
      })
      .then(() => {delayedExecution(dispatch)})
      .catch((err) => {
        dispatch(showModalError(`Стыковка не разрешена|* Неверный логин или пароль`))
        console.log(err)
      })
  };
};
const delayedExecution = (dispatch) => {
  setTimeout(() => {
    dispatch(closeModal());
  }, 250); 
};

export const registration = (data) => {
  return (dispatch) => {
    dispatch(showLoading('запускаем|* идентификацию'))
    return api
      .registration(data)
      .then((res) => {
        if (res.success) {
          addUser(res)
          setCookie("accessToken", res.accessToken)
          setCookie("refreshToken", res.refreshToken, {expires: 10})
          dispatch(setUserData(res.user));
        }
        return res;
      })
      .then(() => {delayedExecution(dispatch)})
      .catch((err) => {
        dispatch(showModalError(err.message))
      })
  };
};

export const logout = () => {
  return (dispatch) => {
    return api.logout()
      .then((res) => {
        if (res.success) {
          removeUser()
          deleteCookie("accessToken")
          deleteCookie("refreshToken")
          dispatch(userLogout())
        }
      })
      .catch((err) => {
        dispatch(showModalError(err.message))
      })
  };
};

export const getUser = () => {
  return (dispatch) => {
    dispatch(showLoading('проверяем мультипаспорт'))
    if (refreshToken) {
    return api.getUser()
      .then((res) => {
        dispatch(setUserData(res.user));
        addUser(res)
      })
      .then(() => {delayedExecution(dispatch)})
      .catch(() => {
        dispatch(showModalError('Что то не так |* попробуйте перезайти'))
      })
    } else {
      logout()
      dispatch(showModalError('ваш токен устарел'))
    }
  };
};

export const checkUserAuth = () => {
  return (dispatch) => {
    if (refreshToken) {
      console.log('токен есть')
    return api.getUser()
      .then((res) => {
        addUser(res)
        dispatch(loadingStatus(true))
        dispatch(setUserData(res.user));
      })
      .then(() => {
        dispatch(loadingStatus(false))
      })
      .catch((err) => {
        dispatch(showModalError(err.message))
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
      .catch((err) => {
        dispatch(showModalError(err.message))
      })
    }
  }

export const forgotPassword = (email) => {
  return (dispatch) => {
  return api.forgotPassword(email)
  .catch((err) => {
    dispatch(showModalError(err.message))
  })
  }
}

export const passwordReset = (form) => {
  return (dispatch) => {
  return api.passwordReset(form)
  .catch((err) => {
    dispatch(showModalError(err.message))
  })
}
}