import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./feed-order-details.module.css";
const FeedOrderDetails = ({ item }) => {
  //   const [orderData, setOrderData] = useState(null);
  //   const orderDetail = useSelector((state) => state.wc);
  const { number } = useParams();

  //   useEffect(() => {
  //     if (orderDetail.orders.length > 0) {
  //       const {
  //         orders: [{ orders: elem }],
  //       } = orderDetail;
  //       setOrderData(elem);

  //     }
  //   }, []);
  const {
    dataList: { data },
  } = useSelector((store) => store);

  const { name, status, ingredients, updatedAt } = item || null;

  let filtered = [];
  let totalPrice = 0;

  const getTotalPrice = (value) => {
    totalPrice += value.price;
  };
  const getFiltered = () => {
    ingredients.forEach((_id) => {
      const findIngr = data.find((ingr) => ingr._id === _id);
      if (findIngr) {
        getTotalPrice(findIngr);
        if (filtered.indexOf(findIngr) < 0) {
          filtered.push(findIngr);
        }
      }
    });
  };
  const getTwinsIngr = (target) => {
    const twin = ingredients.filter((id) => id === target._id);
    return twin.length;
  };
  if (ingredients) {
    getFiltered();
  }

  return item ? (
    <section className={style.mainContainer}>
      <span
        className={`text text_type_digits-default mb-10`}
      >{`#${item.number}`}</span>
      <div className={`mb-15 ${style.headerContainer}`}>
        <h1 className={`text text_type_main-medium ${style.burgerName}`}>{name}</h1>
        <p className={`text text_type_main-default ${style.status}`}>
          {status}
        </p>
      </div>
      <p className="text text_type_main-medium mb-6">Состав:</p>
      <ul className={`mb-10 ${style.ingrList} ${filtered.length > 4 ? style.scrollBar : null}`}>
        {filtered.map((item, index) => {
          return (
            <li key={index} className={`mb-4 ${style.ingr} ${filtered.length <= 4 ? style.ingr_last : null}`}>
              <img
                src={item.image_mobile}
                alt={item.name}
                className={`${style.image}`}
              />
              <h2 className={`text text_type_main-default ${style.ingrHeading}`}>
                {item.name}
              </h2>
              <span className={`text text_type_digits-default ${style.ingrPrice}`}>
                {getTwinsIngr(item)} x {item.price}
              </span>
              <CurrencyIcon type="primary" />
            </li>
          );
        })}
      </ul>
      <div className={`${style.ingrBottom} ${filtered.length > 4 ? style.ingrBottom_gradient : null}`}>
        <FormattedDate
          date={new Date(updatedAt)}
          className={`mt-1 text text_type_main-small ${style.data}`}
        />
        <span className={`text text_type_digits-default ${style.ingrPrice}`}>
          {totalPrice}
        </span>
        <CurrencyIcon type="primary" />
      </div>
    </section>
  ) : null;
};
export default FeedOrderDetails;
