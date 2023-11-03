import { Button } from "@ya.praktikum/react-developer-burger-ui-components"
import { useNavigate } from "react-router-dom"
import style from "./login-link.module.css"

export function LoginLink() {
  const navigate = useNavigate()
    return (
        <div className={style.span}>
        <span className={`text text_type_main-default text_color_inactive`}>
          Вы — новый пользователь?
        
        <Button
          htmlType="button"
          type="secondary"
          size="medium"
          extraClass={style.button}
          onClick={()=> navigate('/register')}
        >
          Зарегистрироваться
        </Button>
        </span>
        <span className={`text text_type_main-default text_color_inactive`}>
        Забыли пароль?
        
        <Button
          htmlType="button"
          type="secondary"
          size="medium"
          extraClass={style.button}
          onClick={()=> navigate('/forgot-password')}
        >
          Восстановить пароль
        </Button>
        </span>
      </div>
    )
}