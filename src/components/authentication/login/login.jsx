import { useDispatch } from "react-redux";

import { EmailInput, PasswordInput, Button,} from "@ya.praktikum/react-developer-burger-ui-components";
import { useFormAndValidation } from "../../../utils/hooks/useFormAndValidation";
import { login } from "../../../service/actions/user-auth";

import style from "./login.module.css";

export function LoginComponent() {
  const {values, handleChange, handleValid, isValid} = useFormAndValidation({email: "", password: ""})
  const status = isValid && values.email && values.password

  const dispatch = useDispatch();

  const onChange = (e) => {
    handleChange(e)
    handleValid()
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(login(values))
  }

  return (
    <form className={style.container} onSubmit={handleSubmit}>
      <fieldset className={style.inputContiner}> 
      <EmailInput
        onChange={onChange}
        value={values.email}
        name={"email"}
        isIcon={false}
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
        extraClass={status ? style.active : style.disabled}
      >
        Войти
      </Button>
    </form>
    )
}
