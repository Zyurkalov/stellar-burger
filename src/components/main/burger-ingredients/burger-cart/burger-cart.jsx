import React from "react";
import PropTypes from "prop-types";
import style from "./burger-cart.module.css";
import {oneIngrPropType} from "../../../../utils/prop-types"
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerCart(props) {
  const [count, setCount] = React.useState(0);

  const addIngredient = () => {
    setCount(count + 1);
    props.addIngr({ props });
  };

  let counterComponent = null;
  if (count !== 0) {
    counterComponent = (
      <Counter count={count} size="default" extraClass="m-1" />
    );
  }
  return (
    <div className={style.cart} key={props._id} onClick={addIngredient}>
      {counterComponent}
      <img src={props.image} alt={props.name} />
      <div className={style.cartPrice}>
        <p className="mt-2 text text_type_digits-default">{props.price}</p>
        <CurrencyIcon />
      </div>
      <h3 className={`mt-3 text text_type_main-small ${style.cartName}`}>
        {props.name}
      </h3>
    </div>
  );
}

BurgerCart.propTypes = oneIngrPropType.isRequired

export default BurgerCart;
