import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../service/actions/user-auth";
import { useLocation } from "react-router-dom";

import style from "./navigation.module.css";

export const ProfileNavigation = () => {
  const dispatch = useDispatch();
  const location = useLocation()
  const state = location.state?.path || 'main';

  function logoutProfile() {
    dispatch(logout())
  }
  const path = window.location.pathname;
  const setActive = (status: boolean) => status ? style.linkActive : style.linkDisabled;

  return (
    <nav className={style.сontainer__leftMenu}>
      <ul className={style.leftMenuBox}>
        <li className={`text text_type_main-medium ${style.linkText}`}>
          <NavLink to="" state={{path: 'main'}} className={() => path === "/profile" ? style.linkActive : style.linkDisabled }>Профиль</NavLink>
        </li>
        <li className={`text text_type_main-medium ${style.linkText}`}>
          <NavLink to="orders" state={{path: 'order'}} className={({isActive}) => setActive(isActive)}>История заказов</NavLink>
        </li>
        <li className={`text text_type_main-medium ${style.linkText}`}>
          {/* <NavLink to="" className={style.linkDisabled} onClick={() => logoutProfile()}>Выход</NavLink> */}
          <button onClick={() => logoutProfile()} className={`${style.button} text_type_main-medium text_color_inactive`}>
        Выход
      </button>
        </li>
      </ul>
      <span className={"text text_type_main-default text_color_inactive"}>
      {state === 'main'
      ? "В этом разделе вы можете изменить свои персональные данные"
      : "В этом разделе вы можете просмотреть свою историю заказов"
      }
      </span>
    </nav>
  );
}
