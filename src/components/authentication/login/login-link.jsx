import { Button } from "@ya.praktikum/react-developer-burger-ui-components"
import style from "./login-link.module.css"

export function LoginLink() {
    return (
        <div className={style.span}>
        <span className={`text text_type_main-default text_color_inactive`}>
          Вы — новый пользователь?
        
        <Button
          htmlType="button"
          type="secondary"
          size="medium"
          extraClass={style.button}
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
        >
          Восстановить пароль
        </Button>
        </span>
      </div>
    )
}