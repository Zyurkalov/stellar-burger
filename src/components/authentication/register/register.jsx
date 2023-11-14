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
import { useNavigate } from "react-router-dom";
import { useInput } from "../../../utils/use-Input";

export function RegisterComponent() {
  const [input, setInput, changedInput, active, modifiedInput] = useInput({email: "", password: "", name: "" });
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const registrNewUser = (form) => {
    dispatch(registration(form))
      .then((data) => {
        if (data && data.success) {
          navigate('/login');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onChange = (e) => {
    modifiedInput(e)
  };

  return (
    <div className={style.container}>
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={onChange}
        value={input.name}
        name={"name"}
      />
      <EmailInput
        onChange={onChange}
        value={input.email}
        name={"email"}
      />
      <PasswordInput
        onChange={onChange}
        value={input.password}
        name={"password"}
        // extraClass="mb-2"
      />
      <Button htmlType="button" type="primary" size="medium" onClick={() => registrNewUser(input)}>
        Зарегистрироваться
      </Button>
      {/* <RegisterLink /> */}
    </div>
  );
}
