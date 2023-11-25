import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./login.module.css";
import { login } from "../../../service/actions/user-auth";
import { Navigate } from "react-router-dom";
import { checkUserAuth } from "../../../service/actions/user-auth";

export function LoginComponent() {
  const dispatch = useDispatch();
  const { userAuthStatus, userData } = useSelector((state) => state.userStatus);

  const [inputValue, setInputValue] = useState({
    // email: "Kent@mail.ru",
    // password: "password",
    email: '',
    password: '',
  });

  const onChangeMail = (e) => {
    setInputValue({...inputValue, email: e.target.value});
  };
  const onChangePassword = (e) => {
    setInputValue({...inputValue, password: e.target.value});
  };
  useEffect(() => {
    dispatch(checkUserAuth())
  },[])

  if (userData.name || userData.email) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className={style.container}>
      <EmailInput
        onChange={onChangeMail}
        value={inputValue.email}
        name={"email"}
        isIcon={false}
      />
      <PasswordInput
        onChange={onChangePassword}
        value={inputValue.password}
        name={"password"}
      />
      <Button
        htmlType="submit" 
        type="primary"
        size="medium"
        onClick={() => dispatch(login(inputValue))}
      >
        Войти
      </Button>
    </div>
  );
}
