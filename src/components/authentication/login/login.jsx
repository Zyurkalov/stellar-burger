import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./login.module.css";
import { login } from "../../../service/actions/authorisation";
import { Navigate } from "react-router-dom";

export function LoginComponent() {
  const dispatch = useDispatch();
  const { userAuthStatus } = useSelector((state) => state.userStatus);

  const [mail, setMail] = useState('');
  const onChangeMail = (e) => {
    setMail(e.target.value);
  };

  const [password, setPassword] = useState("password");
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  if(userAuthStatus){
    return <Navigate to='/' replace />
  }
  return (
    <div className={style.container}>
      <EmailInput
        onChange={onChangeMail}
        value={mail}
        name={"email"}
        isIcon={false}
      />
      <PasswordInput
        onChange={onChangePassword}
        value={password}
        name={"password"}
      />
      <Button htmlType="button" type="primary" size="medium" onClick={() => dispatch(login(true))}>
        Войти
      </Button>
    </div>
  );
}
