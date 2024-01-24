import { api } from "../../utils/user-api";
import { userState } from "../../utils/userState";
import { useCookie } from "../../utils/useCookie";
import { TUser } from "../../Types";
import { AppDispatch } from "../reducers";
import { closeModal, showLoading, showModalError } from "./modal";

const { getCookie, setCookie, deleteCookie } = useCookie
const { addUser, removeUser } = userState
const refreshToken = getCookie("refreshToken")

export const USER_LOGOUT: "USER_LOGOUT" = "USER_LOGOUT";
export const USER_LOADING: "USER_DATA_LOADING" = "USER_DATA_LOADING";
export const LOADING_STATUS: 'LOADING_STATUS' ='LOADING_STATUS'
export const USER_DATA: "USER_DATA" = "USER_DATA";

export const setUserData = (data: TUser) => ({
  type: USER_DATA,
  payload: data,
});
export const userLogout = () => ({
  type: USER_LOGOUT,
});
export const loadingStatus = (type: boolean) => ({
  type: LOADING_STATUS,
  payload: type
})
// в запросах, |* служит обозначением красной строки для текста 
export const login = (data: TUser) => {
  return (dispatch: AppDispatch) => {
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
const delayedExecution = (dispatch: AppDispatch) => {
  setTimeout(() => {
    dispatch(closeModal());
  }, 250); 
};

export const registration = (data: TUser) => {
  return (dispatch: AppDispatch) => {
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
  return (dispatch: AppDispatch) => {
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
  return (dispatch: AppDispatch) => {
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
  return (dispatch: AppDispatch) => {
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

export const editProfile = <T>(inputForm: T) => {
    return (dispatch: AppDispatch) => {
      return api.editProfile(inputForm)
      .then((res) => {
        dispatch(setUserData(res.user));
      })
      .catch((err) => {
        dispatch(showModalError(err.message))
      })
    }
  }

export const forgotPassword = <T>(email: T) => {
  return (dispatch: AppDispatch) => {
  return api.forgotPassword(email)
  .catch((err) => {
    dispatch(showModalError(err.message))
  })
  }
}

export const passwordReset = <T>(form: T) => {
  return (dispatch: AppDispatch) => {
  return api.passwordReset(form)
  .catch((err) => {
    dispatch(showModalError(err.message))
  })
}
}