import MenuList from "./menu-list/menu-list"
import headerStyles from "./header.module.css"

import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'

function AppHeader() {
    return(
        <header className= {`m-15 ${headerStyles.header}`}>
            <div className= {headerStyles.headContainer}>
                <nav>
                    <ul className={headerStyles.headerList}>
                        <MenuList text={'Конструктор'} icon={BurgerIcon} active={true}/>
                        <MenuList text={'Лента заказов'} icon={ListIcon} active={false}/>
                    </ul>
                </nav>
                    <Logo />
                <nav>
                    <ul className={headerStyles.headerList}>
                        <MenuList text={'Личный кабинет'} icon={ProfileIcon} active={false}/>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default AppHeader;