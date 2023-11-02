import { NavLink } from "react-router-dom";
import style from "./navigation.module.css";

export function ProfileNavigation() {
  return (
    <nav className={style.сontainer__leftMenu}>
      <ul className={style.leftMenuBox}>
        <li className={`text text_type_main-medium ${style.linkText}`}>
          <NavLink to="test">Профиль</NavLink>
        </li>
        <li className={`text text_type_main-medium ${style.linkText}`}>
          <NavLink to="test">История заказов</NavLink>
        </li>
        <li className={`text text_type_main-medium ${style.linkText}`}>
          <NavLink to="test">Выход</NavLink>
        </li>
      </ul>
      <span className={"text text_type_main-default text_color_inactive"}>
        В этом разделе вы можете изменить свои персональные данные
      </span>
    </nav>
  );
}
