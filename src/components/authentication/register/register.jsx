import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { RegisterLink } from "./register-link";
import { useState, useRef } from "react";
import style from "./register.module.css";

export function RegisterComponent() {
  const [name, setName] = useState();
  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const [mail, setMail] = useState();
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
        onChange={onChangeName}
        value={name}
        name={"name"}
        isIcon={false}
      />
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
        // extraClass="mb-2"
      />
      <Button htmlType="button" type="primary" size="medium">
        Зарегистрироваться
      </Button>
      {/* <RegisterLink /> */}
    </div>
  );
}
