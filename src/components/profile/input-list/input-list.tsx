import { useAppDispatch } from "../../../utils/hooks/useAppStore";
import { ChangeEvent, SyntheticEvent } from 'react';

import { EmailInput, Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useFormAndValidation } from "../../../utils/hooks/useFormAndValidation";
import { editProfile } from "../../../service/actions/user-auth";

import style from "./input-list.module.css";
import { TRegistration } from "../../../types/types";


export function ProfileInputList() {
  const userData: {email:string, name: string} = {email: sessionStorage.email, name: sessionStorage.name}
  const dispatch = useAppDispatch()

  const initialValue: TRegistration = {
    name: userData.name || "",
    email: userData.email || "",
    password: "",
  }
  const {values, setValues, handleChange, handleValid, isValid, setIsValid} = useFormAndValidation(initialValue, true)
  
  const handleSubmit = (e: SyntheticEvent<Element, Event>) => {
    e.preventDefault();
    dispatch(editProfile(values));
    setIsValid(false)
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e)
    handleValid(e)
    if (e.target.value === userData[e.target.name as keyof typeof userData]) 
      {setIsValid(false)};
  };
  const resetChange = () => {
    setValues(initialValue)
  }

  return (
    <div>
      <form className={style.form}>
        <Input
          onChange={onChange}
          value={values.name}
          name={"name"}
          placeholder="Имя"
          icon="EditIcon"
        />
        <EmailInput
          onChange={onChange}
          value={values.email}
          name={"email"}
          placeholder="Логин"
          isIcon={true}
        />
        <PasswordInput
          onChange={onChange}
          value={values.password}
          name={"password"}
          placeholder="Пароль"
          icon="EditIcon"
        />
        <div className={isValid ? style.active : style.disabled}>
          <div className={style.buttonCont}>
            <Button
              htmlType="reset"
              type="secondary"
              size="medium"
              extraClass="pr-6"
              onClick={resetChange}
              // onClick={resetChange}
            >
              Отмена
            </Button>
            <Button 
              htmlType="submit" 
              type="primary" 
              size="medium"
              onClick={handleSubmit}>
              {/* onClick={handleSubmit}> */}
              Сохранить
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
