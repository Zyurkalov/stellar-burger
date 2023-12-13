import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { IngredientsOrderDetails } from "./ingredients-order-details/ingredients-order-details";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { StatusOrder } from "../status-order/status-order";

import PropTypes from 'prop-types';
import style from "./list-order.module.css";
import mainStyle from "../../constructor/constructor.module.css"

export default function ListOrder({data, addOrder}) {
  const location = useLocation()
  
  let listData = data
  if (location.pathname === '/profile/orders') {
    listData = data.reverse()
  }
  return (
    <ul className={`${style.mainContainer} ${style.scrollBar}`}>
      {listData.map((order, index) => {
        const { number, createdAt, name, status, ingredients} = order
         
        addOrder(order)
        return (
          <li className={`${style.container} ${mainStyle.shadow}`} key={index}>
            <Link key={index} to={`${location.pathname}/${number}`} state={{ background: location, ingredient: order}} className={`${style.links}`}>
            <div className={style.flexContainer}>
              <span className="text text_type_digits-default">{`#${number}`}</span>
              <FormattedDate date={new Date(createdAt)} className={`text text_type_main-small ${style.data}`} />
            </div>
            <div>
              <h2 className={`text text_type_main-medium ${style.header}`}>
               {name}
              </h2>
              <StatusOrder value={status}/>
            </div>
            <IngredientsOrderDetails list={ingredients}/>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

ListOrder.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    _id: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  })).isRequired,
  addOrder: PropTypes.func.isRequired

};
