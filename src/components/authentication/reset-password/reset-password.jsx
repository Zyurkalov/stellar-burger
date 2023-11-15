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
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const onChange = (e) => {
    modifiedInput(e)
  };
  const sendNewPass = () => {
    dispatch(passwordReset(input))
      .then((data) => {
        console.log(data);
        if (data.success) {
          navigate('/login');
        } else {
          console.error(data.errorMessage);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={style.container}>
      <PasswordInput
        onChange={onChange}
        value={input.password}
        name={"password"}
        placeholder={"Введите новый пароль"}
      />
      <Input
        type={"password"}
        placeholder={"Введите код из письма"}
        onChange={onChange}
        value={input.token}
        name={"token"}
        error={false}
      />
      <Button htmlType="button" type="primary" size="medium" onClick={() => sendNewPass(input)} extraClass={active ? style.active : style.disabled}>
        Сохранить
      </Button>
    </div>
  );
}
