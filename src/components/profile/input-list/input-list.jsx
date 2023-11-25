import {
  EmailInput,
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useInput } from "../../../utils/use-Input";
import { useDispatch } from "react-redux";
import { editProfile, getUser } from "../../../service/actions/user-auth";
import style from "./input-list.module.css";

export function ProfileInputList() {
  const { test } = useSelector((state) => state);

  const userData = {email: sessionStorage.email, name: sessionStorage.name}
  const dispatch = useDispatch()

  const initialValue = {
    name: userData.name || "",
    email: userData.email || "",
    password: "",
  }
  const [input, setInput, changedInput, active, modifiedInput] = useInput(initialValue, true);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editProfile(input));
    changedInput(false);
  };
  const onChange = (e) => {
    modifiedInput(e);
    if (e.target.value === userData[e.target.name]) {changedInput(false)};
  };
  const resetChange = () => {
    setInput(initialValue)
  }

  return (
    <div>
      <form className={style.form}>
        <Input
          onChange={onChange}
          value={input.name}
          name={"name"}
          placeholder="Имя"
          icon="EditIcon"
        />
        <EmailInput
          onChange={onChange}
          value={input.email}
          name={"email"}
          placeholder="Логин"
          isIcon={true}
        />
        <PasswordInput
          onChange={onChange}
          value={input.password}
          name={"password"}
          placeholder="Пароль"
          icon="EditIcon"
        />
        <div className={active ? style.active : style.disabled}>
          <div className={style.buttonCont}>
            <Button
              htmlType="reset"
              type="secondary"
              size="medium"
              extraClass="pr-6"
              onClick={resetChange}
            >
              Отмена
            </Button>
            <Button 
              htmlType="submit" 
              type="primary" 
              size="medium"
              onClick={handleSubmit}>
              Сохранить
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
