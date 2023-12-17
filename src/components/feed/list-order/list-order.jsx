import { useSelector } from "react-redux";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";

import { IngredientsOrderDetails } from "./ingredients-order-details/ingredients-order-details";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { StatusOrder } from "../status-order/status-order";

import PropTypes from 'prop-types';
import style from "./list-order.module.css";
import mainStyle from "../../constructor/constructor.module.css"

export default function ListOrder({data, addOrder}) {
  const location = useLocation()
  const {number} = useParams()
  const userTimezone = Intl.DateTimeFormat('en', { timeZoneName: 'short' }).formatToParts(Date.now()).find(part => part.type === 'timeZoneName').value;
  
  return (
    !data ? <h2>Loading...</h2> :
    <ul className={`${style.mainContainer} ${style.scrollBar}`}>
      {data.map((order, index) => {
        const { number, createdAt, name, status, ingredients} = order
        addOrder(order)
        return (
          <li className={`${style.container} ${mainStyle.shadow}`} key={index}>
            <Link key={index} to={`${location.pathname}/${number}`} state={{ background: location, order: order}} className={`${style.links}`}>
            <div className={style.flexContainer}>
              <span className="text text_type_digits-default">{`#${number}`}</span>
              <div className={`text text_type_main-small ${style.data}`}>
                <FormattedDate date={new Date(createdAt)} />
                <span>{userTimezone}</span>
              </div>
            </div>
            <div>
              <h2 className={`text text_type_main-medium ${style.header}`}>
               {name}
              </h2>
              {
              location.pathname === '/feed'
                ? null
                : <StatusOrder value={status}/>
              }
            </div>
            <div>
            <IngredientsOrderDetails list={ingredients} number={number}/>
            </div>
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
