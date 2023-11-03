import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import style from "./login.module.css";

export function LoginComponent() {
  const [mail, setMail] = useState('');
  const onChangeMail = (e) => {
    setMail(e.target.value);
  };

  const [password, setPassword] = useState("password");
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
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
      <Button htmlType="button" type="primary" size="medium">
        Войти
      </Button>
    </div>
  );
}
