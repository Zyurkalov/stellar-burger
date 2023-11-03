import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import {
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./reset-password.module.css"

export function ResetPasswordComponent() {
  const [value, setValue] = useState('');
  const [code, setCode] = useState('');
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const onChangeCode = (e) => {
    setCode(e.target.value);
  };
  return (
    <div className={style.container}>
      <PasswordInput
        onChange={onChange}
        value={value}
        name={"password"}
        placeholder={"Введите новый пароль"}
      />
      <Input
        type={"password"}
        placeholder={"Введите код из письма"}
        onChange={onChangeCode}
        value={code}
        name={"email-code"}
        error={false}
      />
      <Button htmlType="button" type="primary" size="medium">
        Сохранить
      </Button>
    </div>
  );
}
