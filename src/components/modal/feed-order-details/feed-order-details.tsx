import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState, FC } from "react";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks/useAppStore";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { getOrderNumberDetails } from "../../../service/actions/order-number";
import { StatusOrder } from "../../feed/status-order/status-order";
import { useTimezone } from "../../../utils/hooks/useTimezone";

import appStyles from "../../app/app.module.css"
import style from "./feed-order-details.module.css";

import { TListOrders, TIngredient } from '../../../types/types'
import { ScrollBar } from "../../ui-kit/ScrollBar";

const FeedOrderDetails: FC<{item: TListOrders}> = ({item}) => {

  const dispatch = useAppDispatch();
  const location = useLocation();
  const timezone = useTimezone();
  const { number } = useParams();

  const pathName = location.state?.background.pathname
  const setTarget = pathName ==='/feed' || pathName ==='/profile/orders'

  const [dataOrder, setDataOrder] = useState<TListOrders | null>(null);
  const { name, status, ingredients, updatedAt } = dataOrder || {};

  let filtered: TIngredient[] = [];
  let totalPrice = 0;

  const {
    dataList: { data },
    getOrderNumber: { order },
  } = useAppSelector((store) => store);

  const getTotalPrice = (value: TIngredient) => {
    totalPrice += value.price;
  };
  const getFiltered = () => {
    if (ingredients) {
      ingredients.forEach((_id: string) => {
        const findIngr = data.find((ingr) => ingr._id === _id);
        if (findIngr) {
          getTotalPrice(findIngr);
          if (filtered.indexOf(findIngr) < 0) {
            filtered.push(findIngr);
          }
        }
      });
    }
  };
  const getTwinsIngr = (target: TIngredient) => {
    if (ingredients){
      const twin = ingredients.filter((id) => id === target._id);
      return twin.length;
    }
  };
  if (ingredients) {
    getFiltered();
  }

  useEffect(() => {
    if (item === undefined && number !== undefined) {
      dispatch(getOrderNumberDetails(number));
    } else {
      setDataOrder(item);
    }
  }, [item, number, dispatch]);

  useEffect(() => {
    if (order && item === undefined) {
      setDataOrder(order);
    }
  }, [order, item])

  // const userTimezone = Intl.DateTimeFormat('en', { timeZoneName: 'short' }).formatToParts(Date.now()).find(part => part.type === 'timeZoneName').value;

  return dataOrder && 
  <div className={item === undefined && !setTarget ? appStyles.cover : undefined }>
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
      <ScrollBar extraClass={`mb-10 ${style.ingrList} ${filtered.length > 4 ? style.scrollBar : null}`}>
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
      </ScrollBar>
      <div className={`${style.ingrBottom} ${filtered.length > 4 ? style.ingrBottom_gradient : null }`}>
      <div className={`mt-1 text text_type_main-small ${style.data}`}>
        {updatedAt ?
          <FormattedDate
            date={new Date(updatedAt)}
            className={`text text_type_main-small ${style.data}`}
          />
         :null }
        <span>{timezone}</span>
        </div>
        <span className={`text text_type_digits-default ${style.ingrPrice}`}>
          {totalPrice}
        </span>
        <CurrencyIcon type="primary" />
      </div>
    </section>
    </div>
};

export default FeedOrderDetails;
