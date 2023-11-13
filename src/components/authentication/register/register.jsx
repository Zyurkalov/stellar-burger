import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { registration } from "../../../service/actions/user-auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import style from "./register.module.css";

export function RegisterComponent() {
  const [form, setForm] = useState({"email": "", "password": "password", "name": "" });
  const dispatch = useDispatch()
  
  const onChangeUser = (e) => {
    setForm({...form, name: e.target.value})
  };
  const onChangeMail = (e) => {
    setForm({...form, email: e.target.value})
  };
  const onChangePassword = (e) => {
    setForm({...form, password: e.target.value})
  };
  // const sendForm = () => {
  //   console.log(form)
  // }

  return (
    <div className={style.container}>
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={onChangeUser}
        value={form.name}
        name={"name"}
      />
      <EmailInput
        onChange={onChangeMail}
        value={form.email}
        name={"email"}
      />
      <PasswordInput
        onChange={onChangePassword}
        value={form.password}
        name={"password"}
        // extraClass="mb-2"
      />
      <Button htmlType="button" type="primary" size="medium" onClick={() => dispatch(registration(form))}>
        Зарегистрироваться
      </Button>
      {/* <RegisterLink /> */}
    </div>
  );
}
