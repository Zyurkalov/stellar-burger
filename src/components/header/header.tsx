import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useMemo, FC } from "react";
import Modal from "../modal/modal";
import MenuList from "./menu-list/menu-list";
import ModalLoading from "../modal/modal-loading/modal-loading";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import headerStyles from "./header.module.css";
import { THeaderProps } from "../../types";

const Header:FC<{className: string, state: THeaderProps}> = (props): JSX.Element => {
  const { modalLoadingStatus, modalErrorStatus } = props.state;
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const compConstructor = useMemo(
    () => (
      <MenuList text={"Конструктор"} 
      icon={BurgerIcon} 
      active={path === "/"} />
    ),
    [path]
  );
  const compFeed = useMemo(
    () => (
      <MenuList
        text={"Лента заказов"}
        icon={ListIcon}
        active={path === "/feed"}
      />
    ),
    [path]
  );
  const compProfile = useMemo(
    () => (
      <MenuList
        text={"Личный кабинет"}
        icon={ProfileIcon}
        active={path === "/profile" ||  path === "/profile/orders"}
      />
    ),
    [path]
  );

  return (
    <div className={headerStyles.position}>
      <header className={`m-10 mt-5 ${headerStyles.header}`}>
        <div className={headerStyles.headContainer}>
          <nav>
            <ul className={headerStyles.headerList}>
              <NavLink to="/" className={headerStyles.link}>
                {compConstructor}
              </NavLink>
              <NavLink to="feed" className={headerStyles.link}>
                {compFeed}
              </NavLink>
            </ul>
          </nav>
          <button onClick={() => { if (path !== '/') {navigate("/")} }}>
            <Logo />
          </button>
          
          <nav>
            <ul
              className={`${headerStyles.headerList} ${headerStyles.menuElem}`}
            >
              <NavLink to="profile" className={headerStyles.link}>
                {compProfile}
              </NavLink>
            </ul>
          </nav>
        </div>
      </header>
      {modalLoadingStatus || modalErrorStatus ? (
        <Modal title={null}>
          <ModalLoading />
        </Modal>
      ) : null}
      <Outlet />
    </div>
  );
}

export default Header;
