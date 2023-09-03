import React from "react";
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerCart from './burger-cart/burger-cart'
import {data} from "../../../utils/data"
import style from "./burger-ingredients.module.css"

function BurgerIngredients() {
    const burger = data.filter((b) => b.type === "bun");
    const sauce = data.filter((s) => s.type === "sauce");
    const filling = data.filter((f) => f.type === "main");

    function decompositionArr(arrs) {
        return arrs.map((arr) => (
                <BurgerCart key={arr.key} {...arr}/>
        ))
    }
    
    const [current, setCurrent] = React.useState('one')
    return(
        <div>
            <nav style={{ display: 'flex' }} className="mt-5">
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </nav>
                <section className={`${style.cardSection} ${style.scrollBar}`}>
                    <h2 className="mb-6 text text_type_main-medium">Булки</h2>
                    <div className={style.cardContainer}>
                        {decompositionArr(burger)}
                    </div>
                    <h2 className="mt-10 mb-6 text text_type_main-medium">Соусы</h2>
                    <div className={style.cardContainer}>
                        {decompositionArr(sauce)}
                    </div>
                    <h2 className="mt-10 mb-6 text text_type_main-medium">Начинки</h2>
                    <div className={style.cardContainer}>
                        {decompositionArr(filling)}
                    </div>
                </section>
        </div>
    )
}

export default BurgerIngredients