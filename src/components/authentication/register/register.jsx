import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import style from "./register.module.css";

export function RegisterComponent() {
  const [user, setUser] = useState('');
  const onChangeUser = (e) => {
    setUser(e.target.value);
  };

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
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={onChangeUser}
        value={user}
        name={"name"}
      />
      <EmailInput
        onChange={onChangeMail}
        value={mail}
        name={"email"}
      />
      <PasswordInput
        onChange={onChangePassword}
        value={password}
        name={"password"}
        // extraClass="mb-2"
      />
      <Button htmlType="button" type="primary" size="medium">
        Зарегистрироваться
      </Button>
      {/* <RegisterLink /> */}
    </div>
  );
}
