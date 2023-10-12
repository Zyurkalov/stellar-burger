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

function BurgerCart({item}) {
  const dispatch = useDispatch();

  const [{isDrag}, dragRef] = useDrag({
    type: "ingredient",
    item: item,
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  })

  const compCurrencyIcon = useMemo(() => <CurrencyIcon />, []);

  // логика подсчета количества ингредиентов
  const ingrList = useSelector((state) => state.ingrList.ingrList);
  // const findedTwins = ingrList.find(({ _id }) => _id === item._id);
  const findedCopy = ingrList.filter((ingr) => {
    return ingr._id === item._id;
  });

  let counterComponent = null;
  if (findedCopy.length > 0) {
    counterComponent = (
      <Counter count={findedCopy.length} size="default" extraClass="m-1" />
    );
  }
  return (
    <div className={style.cart} key={item._id} onClick={() => dispatch(openIngrModal(item))} ref={dragRef}>
      {counterComponent}
      <img src={item.image} alt={item.name} />
      <div className={style.cartPrice}>
        <p className="mt-2 text text_type_digits-default">{item.price}</p>
        {compCurrencyIcon}
      </div>
      <h3 className={`mt-3 text text_type_main-small ${style.cartName}`}>
        {item.name}
      </h3>
    </div>
  );
}

BurgerCart.propTypes = {
  item: oneIngrPropType.isRequired
};

export default BurgerCart;
