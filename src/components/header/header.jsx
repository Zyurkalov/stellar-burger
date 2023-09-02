import MenuList from "./menu-list/menu-list"
import headerStyles from "./header.module.css"

import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'

function AppHeader() {
    return(
        <header className= {`m-15 ${headerStyles.header}`}>
            <div className= {headerStyles.headContainer}>
                <nav>
                    <ul className={headerStyles.headerList}>
                        <MenuList text={'Конструктор'} icon={BurgerIcon}/>
                        <MenuList text={'Лента заказов'} icon={ListIcon}/>
                    </ul>
                </nav>
                    <Logo />
                <nav>
                    <ul className={headerStyles.headerList}>
                        <MenuList text={'Личный кабинет'} icon={ProfileIcon}/>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default AppHeader;