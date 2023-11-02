import MenuList from "./menu-list/menu-list"
import headerStyles from "./header.module.css"

import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink, Outlet, useLocation } from "react-router-dom"
import { useMemo } from "react";

function Header() {
    const location = useLocation();
    const path = location.pathname

    const compConstructor = useMemo(() => <MenuList text={'Конструктор'} icon={BurgerIcon} active={path === '/'}/>, [path]);
    const compFeed = useMemo(() => <MenuList text={'Лента заказов'} icon={ListIcon} active={path === '/feed'}/>, [path]);
    const compProfile = useMemo(() => <MenuList text={'Личный кабинет'} icon={ProfileIcon} active={path === '/profile'}/>, [path]);
    return(
        <>
            <header className= {`m-10 ${headerStyles.header}`}>
                <div className= {headerStyles.headContainer}>
                    <nav>
                        <ul className={headerStyles.headerList}>
                            <NavLink to='/'>
                                {/* <MenuList text={'Конструктор'} icon={BurgerIcon} active={path === '/'}/> */}
                                {compConstructor}
                            </NavLink>
                            <NavLink to='feed'>
                                {/* <MenuList text={'Лента заказов'} icon={ListIcon} active={path === '/feed'}/> */}
                                {compFeed}
                            </NavLink>
                        </ul>
                    </nav>
                        <Logo />
                    <nav>
                        <ul className={`${headerStyles.headerList} ${headerStyles.menuElem}`}>
                            <NavLink to='profile'>
                                {/* <MenuList text={'Личный кабинет'} icon={ProfileIcon} active={path === '/profile'}/> */}
                                {compProfile}
                            </NavLink>
                        </ul>
                    </nav>
                </div>
            </header>
            <Outlet />
        </>
    )
}

export default Header;