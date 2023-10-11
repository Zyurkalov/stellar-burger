import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openIngrModal } from "../../../../service/actions/modal";
import { useDrag } from "react-dnd";
import PropTypes from 'prop-types';

import style from "./burger-cart.module.css";
import { oneIngrPropType } from "../../../../utils/prop-types";
import { addIngredient } from "../../../../service/actions/constructor";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerCart(props) {
  const dispatch = useDispatch();

  // const addIngr = (value) => {
  //   dispatch(addIngredient(value));
  //   dispatch(openIngrModal(value));
  // };
  const ingr = useMemo(
    () => ({
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
    }),
    []
  );

  const [{isDrag}, dragRef] = useDrag({
    type: "ingredient",
    item: ingr,
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  })

  const compCurrencyIcon = useMemo(() => <CurrencyIcon />, []);

  // логика подсчета количества ингредиентов
  const ingrList = useSelector((state) => state.ingrList.ingrList);
  const findedTwins = ingrList.find(({ _id }) => _id === props._id);

  let counterComponent = null;
  if (findedTwins !== undefined) {
    counterComponent = (
      <Counter count={findedTwins.count} size="default" extraClass="m-1" />
    );
  }
  return (
    <div className={style.cart} key={props._id} onClick={() => dispatch(openIngrModal(ingr))} ref={dragRef}>
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

BurgerCart.propTypes = {
  props: PropTypes.oneOfType([oneIngrPropType, PropTypes.oneOf([null])]).isRequired,
};

export default BurgerCart;
