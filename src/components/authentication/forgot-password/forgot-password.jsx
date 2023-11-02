import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import style from "./forgot-password.module.css"

export function ForgotPassworComponent() {
  const [value, setValue] = useState();
  const onChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <div className={style.container}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <EmailInput
          onChange={onChange}
          value={value}
          name={"email"}
          placeholder="Укажите e-mail"
          isIcon={false}
        />
      </div>
      <Button htmlType="button" type="primary" size="medium">
        Восстановить
      </Button>
    </div>
  );
}
