import { NavLink } from "react-router-dom";
import { logout } from "../../../service/actions/authorisation";
import style from "./navigation.module.css";

export function ProfileNavigation() {
  const path = window.location.pathname;
  const setActive = ({isActive}) => isActive ? style.linkActive : style.linkDisabled;

  return (
    <nav className={style.сontainer__leftMenu}>
      <ul className={style.leftMenuBox}>
        <li className={`text text_type_main-medium ${style.linkText}`}>
          <NavLink to="" className={() => path === "/profile" ? style.linkActive : style.linkDisabled }>Профиль</NavLink>
        </li>
        <li className={`text text_type_main-medium ${style.linkText}`}>
          <NavLink to="test" className={setActive}>История заказов</NavLink>
        </li>
        <li className={`text text_type_main-medium ${style.linkText}`}>
          <NavLink to="test" className={setActive}>Выход</NavLink>
        </li>
      </ul>
      <span className={"text text_type_main-default text_color_inactive"}>
        В этом разделе вы можете изменить свои персональные данные
      </span>
    </nav>
  );
}
