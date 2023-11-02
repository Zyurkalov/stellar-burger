import { EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import style from "./input-list.module.css"

export function ProfileInputList() {
  const [name, setName] = useState("Марк");
  const [mail, setMail] = useState("mail@stellar.burgers");
  const [pass, setPass] = useState("******|");
  const onChangeName = (e) => {
    setName(e.target.name);
  };
  const onChangeMail = (e) => {
    setMail(e.target.mail);
  };
  const onChangePass = (e) => {
    setPass(e.target.pass);
  };
  return(
    <div className={style.container}>
      <EmailInput
        onChange={onChangeName}
        value={name}
        name={"login"}
        placeholder="Имя"
        isIcon={true}
      />
      <EmailInput
        onChange={onChangeMail}
        value={mail}
        name={"mail"}
        placeholder="Логин"
        isIcon={true}
      />
      <EmailInput
        onChange={onChangePass}
        value={pass}
        name={"password"}
        placeholder="Пароль"
        isIcon={true}
      />
    </div>
  );
}
