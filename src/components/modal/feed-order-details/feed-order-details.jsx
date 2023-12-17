import { useLocation, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { getOrderNumberDetails } from "../../../service/actions/order-number";
import { StatusOrder } from "../../feed/status-order/status-order";

import appStyles from "../../app/app.module.css"
import style from "./feed-order-details.module.css";
const FeedOrderDetails = ({ item }) => {

  const dispatch = useDispatch();
  const location = useLocation()
  const { number } = useParams();

  const pathName = location.state?.background.pathname
  const setTarget = pathName ==='/feed' || pathName ==='/profile/orders'

  const [dataOrder, setDataOrder] = useState(null);
  const { name, status, ingredients, updatedAt } = dataOrder || {};
  let filtered = [];
  let totalPrice = 0;

  const {
    dataList: { data },
    getOrderNumber: { order },
  } = useSelector((store) => store);

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

  useEffect(() => {
    if (item === undefined) {
      dispatch(getOrderNumberDetails(number));
    } else {
      setDataOrder(item);
    }
  }, [item, number]);

  useEffect(() => {
    if (order && item === undefined) {
      setDataOrder(order);
    }
  }, [order, item])

  const userTimezone = Intl.DateTimeFormat('en', { timeZoneName: 'short' }).formatToParts(Date.now()).find(part => part.type === 'timeZoneName').value;

  return dataOrder && 
  <div className={item === undefined ? appStyles.cover : null }>
    <section className={`${style.mainContainer} `}>
      {setTarget 
        ? null 
        : <span className={`text text_type_digits-default mb-10`}>
        {`#${number}`}
      </span>
      }
      
      <div className={`mb-15 ${style.headerContainer}`}>
        <h1 className={`text text_type_main-medium ${style.burgerName}`}>
          {name}
        </h1>
        <StatusOrder value={status}/>
      </div>
      <p className="text text_type_main-medium mb-6">Состав:</p>
      <ul className={`mb-10 ${style.ingrList} ${filtered.length > 4 ? style.scrollBar : null}`}>
        {filtered.map((item, index) => {
          return (
            <li
              key={index}
              className={`mb-4 ${style.ingr} ${filtered.length <= 4 ? style.ingr_last : null
                }`}
            >
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
      <div className={`${style.ingrBottom} ${filtered.length > 4 ? style.ingrBottom_gradient : null }`}>
      <div className={`mt-1 text text_type_main-small ${style.data}`}>
        <FormattedDate
          date={new Date(updatedAt)}
          className={`text text_type_main-small ${style.data}`}
        />
        <span>{userTimezone}</span>
        </div>
        <span className={`text text_type_digits-default ${style.ingrPrice}`}>
          {totalPrice}
        </span>
        <CurrencyIcon type="primary" />
      </div>
    </section>
    </div>
};

FeedOrderDetails.propTypes = {
  item: PropTypes.shape({
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }),
};
export default FeedOrderDetails;
