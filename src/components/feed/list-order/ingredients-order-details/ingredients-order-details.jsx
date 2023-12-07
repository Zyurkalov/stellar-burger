import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";

import style from "./ingredients-order-details.module.css";

export function IngredientsOrderDetails({list}) {
  const {
    dataList: { data },
  } = useSelector((store) => store);

  let filtered = [];
  let totalPrice = 0;

  const getTotalPrice = (value) => {
      totalPrice += value.price;
  }
  const getFiltered = () => {
    list.forEach((id) => {
      const findIngr = data.find((ingr) => ingr._id === id);
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
          <li key={index} style={{ position: "relative" }}>
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
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );
}

IngredientsOrderDetails.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string).isRequired
}
