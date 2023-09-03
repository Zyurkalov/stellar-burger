import React from "react";
import style from './burger-cart.module.css'
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'

class BurgerCart extends React.Component {
    constructor(props) {
        super(props)
    }
    render () {
        const {name, image, price} = this.props
        return (
            <div className={style.cart}>              
                <img src={image} alt={name}></img>
                <div className={style.cartPrice}>
                    <p className=" mt-2 text text_type_digits-default">{price}</p>
                    <CurrencyIcon />
                </div>
                <h3 className={`mt-3 text text_type_main-small ${style.cartName}`}>{name}</h3>
                
            </div>
        )
    }
}

export default BurgerCart