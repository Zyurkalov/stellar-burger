import React from "react";
import PropTypes from "prop-types";
import style from "./burger-cart.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerCart(props) {
  const [count, setCount] = React.useState(0);

  BurgerCart.propTypes = {
      props: PropTypes.shape({
        addIngr: PropTypes.func,
        _id: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
        proteins: PropTypes.number,
        fat: PropTypes.number,
        carbohydrates: PropTypes.number,
        calories: PropTypes.number,
        price: PropTypes.number,
        image: PropTypes.string,
        image_mobile: PropTypes.string,
        image_large: PropTypes.string,
        __v: PropTypes.number,
      }).isRequired,
  };

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

export default BurgerCart;
