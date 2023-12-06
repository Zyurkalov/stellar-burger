import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo } from "react";
import { useSelector } from "react-redux";

import style from "./ingredients-order-details.module.css";

export function IngredientsOrderDetails() {
  const ingredient = [
    "643d69a5c3f7b9001cfa093d",
    "643d69a5c3f7b9001cfa0946",
    "643d69a5c3f7b9001cfa0943",
    "643d69a5c3f7b9001cfa0941",
    "643d69a5c3f7b9001cfa0946",
    "643d69a5c3f7b9001cfa0943",
    "643d69a5c3f7b9001cfa0946",
    "643d69a5c3f7b9001cfa0943",
  ];

  const {
    dataList: { data },
  } = useSelector((store) => store);

  const compCurrencyIcon = useMemo(() => <CurrencyIcon type="primary" />, []);

  let totalPrice = 0;
  const imageList = () => {
    const listItems = ingredient.map((id, index) => {
      const findIngr = data.find((ingr) => ingr._id === id);
      if (findIngr) {
        totalPrice += findIngr.price;
        if (index <= 5) {
          return (
            <li key={index} style={{ position: "relative" }}>
              <img
                src={findIngr.image_mobile}
                alt={findIngr.name}
                className={`${style.image} ${
                  index === 5 &&
                  ingredient.length > index + 1 &&
                  style.image_last
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
                  {ingredient.length > index + 1
                    ? `+${ingredient.length - index - 1}`
                    : null}
                </span>
              )}
            </li>
          );
        }
      } else {
        return null;
      }
    });
    return listItems;
  };

  return (
    <div className={style.flexContainer}>
      <ul className={style.imageList}>{imageList()}</ul>
      <div className={`${style.cartPrice} mb-2`}>
        <p className="mt-2 text text_type_digits-default">{totalPrice}</p>
        {compCurrencyIcon}
      </div>
    </div>
  );
}
