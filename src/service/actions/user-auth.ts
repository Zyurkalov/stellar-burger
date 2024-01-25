import { api } from "../../utils/user-api";
import { userState } from "../../utils/userState";
import { useCookie } from "../../utils/useCookie";
import { TRegistration, TUserAuth } from "../../types";
import { AppDispatch } from "..";
import { closeModal, showLoading, showModalError } from "./modal";

const { getCookie, setCookie, deleteCookie } = useCookie
const { addUser, removeUser } = userState
const refreshToken = getCookie("refreshToken")

export const USER_LOGOUT: "USER_LOGOUT" = "USER_LOGOUT";
export const USER_LOADING: "USER_DATA_LOADING" = "USER_DATA_LOADING";
export const LOADING_STATUS: 'LOADING_STATUS' ='LOADING_STATUS'
export const USER_DATA: "USER_DATA" = "USER_DATA";

type TSetUserData = {
  type: typeof USER_DATA,
  payload: TUserAuth,
}
type TUserLogout = {
  type: typeof USER_LOGOUT,
}
type TLoadingStatus = {
  type: typeof LOADING_STATUS,
  payload: boolean,
}
export type TUserAuthAction = TSetUserData | TUserLogout | TLoadingStatus

export const setUserData = (data: TUserAuth) => ({
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

export const login = (data: TUserAuth) => {
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
        // символ |* служит красной строкой для текста 
        console.log(err)
      })
  };
};
const delayedExecution = (dispatch: AppDispatch) => {
  setTimeout(() => {
    dispatch(closeModal());
  }, 250); 
};

export const registration = (data: TRegistration) => {
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

export const editProfile = (inputForm: TRegistration) => {
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

export const forgotPassword = (email: {email: string}) => {
  return (dispatch: AppDispatch) => {
  return api.forgotPassword(email)
  .catch((err) => {
    dispatch(showModalError(err.message))
  })
  }
}

export const passwordReset = (form: {password: string, token: string}) => {
  return (dispatch: AppDispatch) => {
  return api.passwordReset(form)
  .catch((err) => {
    dispatch(showModalError(err.message))
  })
}
}