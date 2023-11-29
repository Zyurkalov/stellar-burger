import { api } from "../../utils/user-api";
import { closeModal, showLoading, showModalError } from "./modal";
import { useStorage } from "../../utils/use-storage";
// export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";
// export const USER_REGISTER = "USER_REGISTER";
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

export const login = (data) => {
  return (dispatch) => {
    dispatch(showLoading('стыковка...'))
    return api
      .login(data)
      .then((res) => {
        if (res.success) {
          useStorage.addAll(res)
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
          useStorage.addAll(res)
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
          useStorage.remove()
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
    if (localStorage.accessToken) {
    return api.getUser()
      .then((res) => {
        dispatch(setUserData(res.user));
        useStorage.addUser(res)
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
    if (localStorage.accessToken) {
      console.log('токен есть')
    return api.getUser()
      .then((res) => {
        dispatch(setUserData(res.user));

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