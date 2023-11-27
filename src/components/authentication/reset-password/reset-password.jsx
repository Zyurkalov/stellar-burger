import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useInput } from "../../../utils/use-Input";
import { useNavigate } from "react-router-dom";
import { passwordReset } from "../../../service/actions/user-auth";
import { useDispatch } from "react-redux";
import style from "./reset-password.module.css"

export function ResetPasswordComponent() {
  const [input, setInput, changedInput, active, modifiedInput] = useInput({password: "", token: ""});
  const status = active && input.token && input.password

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onChange = (e) => {
    modifiedInput(e)
  };
  const sendNewPass = (e) => {
    e.preventDefault();
    if (input.token && input.password) {
      dispatch(passwordReset(input))
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
        value={input.password}
        name={"password"}
        placeholder={"Введите новый пароль"}
      />
      </fieldset>
      <fieldset className={style.inputContainer}>
      <Input
        type={"password"}
        placeholder={"Введите код из письма"}
        onChange={onChange}
        value={input.token}
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
