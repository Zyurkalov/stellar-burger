import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { useInput } from "../../../utils/use-Input";
import style from "./login.module.css";
import { login } from "../../../service/actions/user-auth";
import { Navigate } from "react-router-dom";

export function LoginComponent() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const [input, setInput, changedInput, active, modifiedInput] = useInput({email: "", password: ""});
  const status = active && input.email && input.password
  
  const onChange = (e) => {
    modifiedInput(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(login(input))
  }

  return (
    userData.name || userData.email 
    ? (<Navigate to="/" replace />) 
    : (<form className={style.container} onSubmit={handleSubmit}>
      <fieldset className={style.inputContiner}> 
      <EmailInput
        onChange={onChange}
        value={input.email}
        name={"email"}
        isIcon={false}
      />
      </fieldset>
      <fieldset className={style.inputContiner}> 
      <PasswordInput
        onChange={onChange}
        value={input.password}
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
    </form>)
  );
}
