import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openIngrModal } from "../../../../service/actions/modal";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";

import style from "./burger-cart.module.css";
import { oneIngrPropType } from "../../../../utils/prop-types";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerCart({item}) {
  const dispatch = useDispatch();
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
  const ingrList = useSelector((state) => state.ingrList.ingrList);
  // const findedTwins = ingrList.find(({ _id }) => _id === item._id);
  const findedCopy = ingrList.filter((ingr) => {
    return ingr._id === item._id;
  });

  let counterComponent = null;
  if (findedCopy.length > 0) {
    counterComponent = (
      <Counter count={item.type === "bun" ? findedCopy.length*2 : findedCopy.length} size="default" extraClass="m-1" />
    );
  }
  return (
    <Link key={item._id} to={`/ingredients/${item._id}`} state={{ background: location, ingredient: item }} className={style.cart} ref={dragRef}>
    {/* <div className={style.cart} key={item._id} ref={dragRef}> */}
    {/* <div className={style.cart} key={item._id} onClick={() => dispatch(openIngrModal(item))} ref={dragRef}> */}
      {counterComponent}
      <img src={item.image} alt={item.name} />
      <div className={style.cartPrice}>
        <p className="mt-2 text text_type_digits-default">{item.price}</p>
        {compCurrencyIcon}
      </div>
      <h3 className={`mt-3 text text_type_main-small ${style.cartName}`}>
        {item.name}
      </h3>
    {/* </div> */}
    </Link>
  );
}

BurgerCart.propTypes = {
  item: oneIngrPropType.isRequired
};

export default BurgerCart;
