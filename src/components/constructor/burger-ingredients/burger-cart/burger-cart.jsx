import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";

import style from "./burger-cart.module.css";
import { oneIngrPropType } from "../../../../utils/prop-types";
import {
  CurrencyIcon,
  Counter,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerCart({item}) {
  let location = useLocation();

  const [{isDrag}, dragRef] = useDrag({
    type: "ingredient",
    item: item,
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  })

  const compCurrencyIcon = useMemo(() => <CurrencyIcon />, []);

  // логика подсчета количества ингредиентов
  const ingrList = useSelector((state) => state.ingrList.other);
  const bunList = useSelector((state) => state.ingrList.bun);
  
  const findedCopyIngr = ingrList.filter((ingr) => {
    return ingr._id === item._id;
  });
  const findedCopyBun = ingrList.filter((ingr) => {
    return ingr._id === item._id;
  });

  let counterComponent = item.type !== 'bun' 
  ? (findedCopyIngr.length > 0) 
    ? <Counter count={findedCopyIngr.length} size="default" extraClass="m-1" />
    : null
  : (bunList.length > 0 && bunList[0]._id === item._id) 
    ? <Counter count={bunList.length * 2} size="default" extraClass="m-1" />
    : null;

  return (
    <Link key={item._id} to={`/ingredients/${item._id}`} state={{ background: location, ingredient: item }} className={style.cart} ref={dragRef}>
      {counterComponent}
      <img src={item.image} alt={item.name} />
      <div className={style.cartPrice}>
        <p className="mt-2 text text_type_digits-default">{item.price}</p>
        {compCurrencyIcon}
      </div>
      <h3 className={`mt-3 text text_type_main-small ${style.cartName}`}>
        {item.name}
      </h3>
    </Link>
  );
}

BurgerCart.propTypes = {
  item: oneIngrPropType.isRequired
};

export default BurgerCart;
