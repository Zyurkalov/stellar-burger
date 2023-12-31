import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormAndValidation } from "../../../utils/hooks/useFormAndValidation";
import { EmailInput, PasswordInput, Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { registration } from "../../../service/actions/user-auth";

import style from "./register.module.css";

export function RegisterComponent() {
  const { values, handleChange, handleValid, isValid} = useFormAndValidation({email: "", password: "", name: "" })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const status = isValid && values.email && values.password && values.name

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registration(values));
  };
  const onChange = (e) => {
    handleChange(e)
    handleValid()
  };

  return (
    <form className={style.container} onSubmit={handleSubmit}>
      <fieldset className={style.inputContiner}> 
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={onChange}
        value={values.name}
        name={"name"}
      />
      </fieldset>
      <fieldset className={style.inputContiner}>  
      <EmailInput
        onChange={onChange}
        value={values.email}
        name={"email"}
        
      />
      </fieldset>
      <fieldset className={style.inputContiner}> 
      <PasswordInput
        onChange={onChange}
        value={values.password}
        name={"password"}
      />
      </fieldset>
      <Button 
        htmlType="submit" 
        type="primary" 
        size="medium" 
        extraClass={status ? style.active : style.disabled}>
        Зарегистрироваться
      </Button>
    </form>
  );
}
