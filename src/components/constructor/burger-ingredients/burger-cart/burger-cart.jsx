import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";

import { oneIngrPropType } from "../../../../utils/prop-types";
import {counterComponent} from "./counter/counter"
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-cart.module.css";

const BurgerCart = ({item}) => {
  let location = useLocation();

  const [{isDrag}, dragRef] = useDrag({
    type: "ingredient",
    item: item,
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  })

  const compCurrencyIcon = useMemo(() => <CurrencyIcon />, []);
  const ingrList = useSelector((state) => state.ingrList.other);
  const bunList = useSelector((state) => state.ingrList.bun);
  const commonList = useSelector((state) => state.ingrList.list);
  console.log(commonList)

  return (
    <Link key={item._id} to={`/ingredients/${item._id}`} state={{ background: location, ingredient: item }} className={style.cart} ref={dragRef}>
      {counterComponent(item, ingrList, bunList)}
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
