import { useDispatch } from "react-redux";

import { EmailInput, Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useFormAndValidation } from "../../../utils/hooks/useFormAndValidation";
import { editProfile } from "../../../service/actions/user-auth";

import style from "./input-list.module.css";

export function ProfileInputList() {
  const userData = {email: sessionStorage.email, name: sessionStorage.name}
  const dispatch = useDispatch()

  const initialValue = {
    name: userData.name || "",
    email: userData.email || "",
    password: "",
  }
  const {values, setValues, handleChange, handleValid, isValid, setIsValid} = useFormAndValidation(initialValue, true)
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editProfile(values));
    setIsValid(false)
  };
  const onChange = (e) => {
    handleChange(e)
    handleValid(e)
    if (e.target.value === userData[e.target.name]) {setIsValid(false)};
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
