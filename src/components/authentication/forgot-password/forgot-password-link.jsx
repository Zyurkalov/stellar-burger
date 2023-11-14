import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";
import style from "../login/login-link.module.css";

export function ForgotPasswordLink() {
  const navigate = useNavigate();
  return (
    <div className={style.span}>
      <span className={`text text_type_main-default text_color_inactive`}>
        Вспомнили пароль?
        <Button
          htmlType="button"
          type="secondary"
          size="medium"
          extraClass={style.button}
          onClick={()=> navigate('/login')}
        >
          Войти
        </Button>
      </span>
    </div>
  );
}
