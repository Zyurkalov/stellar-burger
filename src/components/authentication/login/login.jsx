import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInput } from "../../../utils/use-Input";
import style from "./login.module.css";
import { login } from "../../../service/actions/user-auth";
import { Navigate } from "react-router-dom";

export function LoginComponent() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.userStatus);
  const [input, setInput, changedInput, active, modifiedInput] = useInput({email: "", password: ""});
  const onChange = (e) => {
    modifiedInput(e);
  };

  useEffect(() => {
    const handleSubmit = (event) => {
      if (event.key === "Enter" && active) {
        dispatch(login(input));
      }
    };
    window.addEventListener("keydown", handleSubmit);
    return () => {
      window.removeEventListener("keydown", handleSubmit);
    };
  }, [input]);

  return (
    userData.name || userData.email 
    ? (<Navigate to="/" replace />) 
    : (<div className={style.container}>
      <div className={style.inputContiner}> 
      <EmailInput
        onChange={onChange}
        value={input.email}
        name={"email"}
        isIcon={false}
      />
      </div>
      <div className={style.inputContiner}> 
      <PasswordInput
        onChange={onChange}
        value={input.password}
        name={"password"}
      />
      </div>
      <Button
        htmlType="submit"
        type="primary"
        size="medium"
        extraClass={active ? style.active : style.disabled}
        onClick={() => dispatch(login(input))}
      >
        Войти
      </Button>
    </div>)
  );
}
