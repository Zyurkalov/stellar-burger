import { Button } from "@ya.praktikum/react-developer-burger-ui-components"
import style from "../login/login-link.module.css";

export function RegisterLink() {
    return(
        <div className={style.span}>
        <span className={`text text_type_main-default text_color_inactive`}>
          Уже зарегистрированы?
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            extraClass={style.button}
          >
            Войти
          </Button>
        </span>
      </div>
    )
}