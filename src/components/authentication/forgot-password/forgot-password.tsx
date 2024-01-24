import { ChangeEvent, SyntheticEvent } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from '../../../utils/hooks/useAppStore';

import { useFormAndValidation } from "../../../utils/hooks/useFormAndValidation";
import { forgotPassword } from "../../../service/actions/user-auth";
import { EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";

import style from "./forgot-password.module.css";

export function ForgotPassworComponent() {
  const {values, handleChange, handleValid,setIsValid, isValid} = useFormAndValidation({email: ""}, true)
  const status = isValid && values?.email
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e)
    handleValid(e)
  };

  const sendEmail = (e: SyntheticEvent<Element, Event>) => {
    e.preventDefault();
    if (values.email) {
      dispatch(forgotPassword(values))
        .then((data) => {
          if (data.success) {
            setIsValid(false);
            navigate("/reset-password", {state: {from: "forgot-password"}});
          } else {
            console.error(data.error);
          }
        })
        .catch((err) => {
          console.error(err); 
        });
    }
  };
  return (
    <form className={style.container} onSubmit={sendEmail}>
      <fieldset className={style.inputContainer}>
        <EmailInput
          onChange={onChange}
          value={values.email}
          name={"email"}
          placeholder="Укажите e-mail"
          isIcon={false}
        />
      </fieldset>
      <Button
        htmlType="submit" 
        type="primary"
        size="medium"
        extraClass={status ? style.active : style.disabled}
      >
        Восстановить
      </Button>
    </form>
  );
}
