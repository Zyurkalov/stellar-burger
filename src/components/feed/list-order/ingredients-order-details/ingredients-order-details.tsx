import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useMemo } from "react";
import { useAppSelector } from "../../../../utils/hooks/useAppStore";

import { TIngredient } from "../../../../types";
import style from "./ingredients-order-details.module.css";

export const IngredientsOrderDetails: FC<{list: string[] | null}> = ({list}) => {
  const currencyIcon = useMemo(() => <CurrencyIcon type="primary"/>, []);
  const {dataList: { data }} = useAppSelector((store) => store);

  let filtered: TIngredient[] = [];
  let totalPrice = 0;

  const getTotalPrice = (value: TIngredient) => {
      totalPrice += value.price;
  }
  const getFiltered = () => {
    if (list === null) {
      return null
    }
    list.forEach((id) => {
      const findIngr = data.find((ingr) => ingr._id === id.toString());
      if (findIngr) {
        getTotalPrice(findIngr)
        if (filtered.indexOf(findIngr) < 0) {
          filtered.push(findIngr);
        }
      }
    });
  };
  const getImageList = () => {
    getFiltered();
    const listItems = filtered.map((item, index) => {
      if (index <= 5) {
        return (
          // <Link to={`/ingredients/${item._id}`} state={{ background: location, ingredient: item }} key={index} className={''}>
          <li key={index}>
            <img
              src={item.image_mobile}
              alt={item.name}
              className={`${style.image} ${
                index === 5 && filtered.length > index + 1 && style.image_last
              }`}
              style={{
                left: `${index * 50}px`,
                zIndex: 10 - index,
              }}
            />
            {index === 5 && (
              <span
                style={{ left: `${index * 50 + 22}px` }}
                className={`text text_type_main-small ${style.imageCount}`}
              >
                {filtered.length > index + 1
                  ? `+${filtered.length - index - 1}`
                  : null}
              </span>
            )}
            </li>
          // </Link >
        );
      } else {
        return null;
      }
    });
    return listItems
  
  };

  return (
    <div className={style.flexContainer}>
      <ul className={style.imageList}>{getImageList()}</ul>
      <div className={`${style.cartPrice} mb-2`}>
        <p className="mt-2 text text_type_digits-default">{totalPrice}</p>
        {currencyIcon}
      </div>
    </div>
  );
}

