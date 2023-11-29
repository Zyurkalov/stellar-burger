import MenuList from "./menu-list/menu-list";
import headerStyles from "./header.module.css";
import { useSelector } from "react-redux";
import Modal from "../modal/modal";
import ModalLoading from "../modal/modal-loading/modal-loading";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useMemo, useRef } from "react";

function Header(props) {
  const { modalLoadingStatus, modalErrorStatus } = props.state;
  const location = useLocation();
  const path = location.pathname;

  const token = localStorage.accessToken
  const linkClass = () => {
    return token === undefined ? headerStyles.link_disabled : null
  }

  const compConstructor = useMemo(
    () => (
      <MenuList text={"Конструктор"} icon={BurgerIcon} active={path === "/"} />
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
        active={path === "/profile"}
      />
    ),
    [path]
  );

  const { loading } = useSelector((state) => state.user);

  return (
    <div className={headerStyles.position}>
      <header className={`m-10 ${headerStyles.header}`}>
        <div className={headerStyles.headContainer}>
          <nav>
            <ul className={headerStyles.headerList}>
              {/* <NavLink to="/" className={`${headerStyles.link} ${linkClass()}`}> */}
              <NavLink to="/" className={headerStyles.link}>
                {compConstructor}
              </NavLink>
              {/* <NavLink to="feed" className={`${headerStyles.link} ${linkClass()}`}> */}
              <NavLink to="feed" className={headerStyles.link}>
                {compFeed}
              </NavLink>
            </ul>
          </nav>
          <Logo />
          <nav>
            <ul
              className={`${headerStyles.headerList} ${headerStyles.menuElem}`}
            >
              {/* <NavLink to="profile" className={`${headerStyles.link} ${linkClass()}`}> */}
              <NavLink to="profile" className={headerStyles.link}>
                {compProfile}
              </NavLink>
            </ul>
          </nav>
        </div>
      </header>
      {/* <div className={`${headerStyles.statusLoading} ${loading.status ? headerStyles.statusLoading_active : headerStyles.statusLoading_disabled}`}>
                <span className={`text text_type_main-medium`}>{loading.message}</span>
            </div> */}
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
