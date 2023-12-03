import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { PasswordInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useFormAndValidation } from "../../../utils/hooks/useFormAndValidation";
import { passwordReset } from "../../../service/actions/user-auth";

import style from "./reset-password.module.css"

export function ResetPasswordComponent() {
  const {values, handleChange, handleValid, isValid} = useFormAndValidation({password: "", token: ""})
  const status = isValid && values.token && values.password

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onChange = (e) => {
    handleChange(e)
    handleValid()
  };
  const sendNewPass = (e) => {
    e.preventDefault();
    if (values.token && values.password) {
      dispatch(passwordReset(values))
      .then((data) => {
        if (data.success) {
          navigate('/login');
        }
      })
      .catch((error) => {
        console.error(error);
      });
    }
  };
  
  return (
    <form className={style.container} onSubmit={sendNewPass}>
      <fieldset className={style.inputContainer}>
      <PasswordInput
        onChange={onChange}
        value={values.password}
        name={"password"}
        placeholder={"Введите новый пароль"}
      />
      </fieldset>
      <fieldset className={style.inputContainer}>
      <Input
        type={"password"}
        placeholder={"Введите код из письма"}
        onChange={onChange}
        value={values.token}
        name={"token"}
        error={false}
      />
      </fieldset>
      <Button htmlType="submit" type="primary" size="medium" extraClass={status ? style.active : style.disabled}>
        Сохранить
      </Button>
    </form>
  );
}
