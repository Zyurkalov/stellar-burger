import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../service/actions/user-auth";

import style from "./navigation.module.css";

export function ProfileNavigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function logoutProfile() {
    await dispatch(logout())
    // navigate("/login", { replace: true });
  }

  const path = window.location.pathname;
  const setActive = ({isActive}) => isActive ? style.linkActive : style.linkDisabled;

  return (
    <nav className={style.сontainer__leftMenu}>
      <ul className={style.leftMenuBox}>
        <li className={`text text_type_main-medium ${style.linkText}`}>
          <NavLink to="" className={() => path === "/profile" ? style.linkActive : style.linkDisabled }>Профиль</NavLink>
        </li>
        <li className={`text text_type_main-medium ${style.linkText}`}>
          <NavLink to="orders" className={setActive}>История заказов</NavLink>
        </li>
        <li className={`text text_type_main-medium ${style.linkText}`}>
          <NavLink to="" className={style.linkDisabled} onClick={() => logoutProfile()}>Выход</NavLink>
          {/* <button className={style.linkDisabled} onClick={() => logoutProfile()}>Выход</button> */}
        </li>
      </ul>
      <span className={"text text_type_main-default text_color_inactive"}>
        В этом разделе вы можете изменить свои персональные данные
      </span>
    </nav>
  );
}
