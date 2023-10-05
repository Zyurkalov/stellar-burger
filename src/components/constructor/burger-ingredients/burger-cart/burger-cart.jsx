import React, {useMemo} from "react";
import { useDispatch, useSelector } from "react-redux";

import style from "./burger-cart.module.css";
import { oneIngrPropType } from "../../../../utils/prop-types";
import { addIngredient } from "../../../../service/actions/constructor";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerCart(props) {
  const dispatch = useDispatch()
  // const [count, setCount] = React.useState(0);
  const ingr = useMemo(() => ({
    _id: props._id,
    name: props.name, 
    type: props.type,
    image_large: props.image_large,
    image: props.image,
    image_mobile: props.image_mobile,

    calories: props.calories,
    proteins: props.proteins,
    fat: props.fat,
    carbohydrates: props.carbohydrates,

    price: props.price,
    count: 0,
  }), [])

  const compCurrencyIcon = useMemo(() =>(
    <CurrencyIcon />
  ), []);
  // const addIngredient = useCallback(() => {
  //   props.toggleIngrModal(ingr)
  //   setCount(count + 1);
  //   props.addIngr({ props });
  // },[props.addIngr, count]);
  
  // логика подсчета количества ингредиентов
  const ingrList = useSelector((state) => state.ingrList.ingrList)
  const findedTwins = ingrList.find(({_id}) => _id === props._id)
  
  let counterComponent = null;
  if (findedTwins !== undefined) {
    counterComponent = (
      <Counter count={findedTwins.count} size="default" extraClass="m-1" />
    );
  }
  return (
    // <div className={style.cart} key={props._id} onClick={addIngredient}>
    <div className={style.cart} key={props._id} onClick={() => dispatch(addIngredient(ingr))}>
      {counterComponent}
      <img src={props.image} alt={props.name} />
      <div className={style.cartPrice}>
        <p className="mt-2 text text_type_digits-default">{props.price}</p>
        {compCurrencyIcon}
      </div>
      <h3 className={`mt-3 text text_type_main-small ${style.cartName}`}>
        {props.name}
      </h3>
    </div>
  );
}

BurgerCart.propTypes = oneIngrPropType.isRequired;

export default BurgerCart;
