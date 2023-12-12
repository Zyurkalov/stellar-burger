import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { IngredientsOrderDetails } from "./ingredients-order-details/ingredients-order-details";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import style from "./list-order.module.css";

export default function ListOrder({data, addOrder}) {
  const location = useLocation()
  console.log(data)
  return (
    <ul className={`${style.mainContainer} ${style.scrollBar}`}>
      {data.map((order, index) => {
        addOrder(order)
        return (
          <li className={style.container} key={index}>
            <Link key={index} to={`/feed/${order.number}`} state={{ingredient: order}} className={style.links}>
            <div className={style.flexContainer}>
              <span className="text text_type_digits-default">{`#${order.number}`}</span>
              <FormattedDate date={new Date(order.createdAt)} className={`text text_type_main-small ${style.data}`} />
            </div>
            <div>
              <h2 className={`text text_type_main-medium ${style.header}`}>
               {order.name}
              </h2>
              <p className={`text text_type_main-small`}>{`${order.status}`}</p>
            </div>
            <IngredientsOrderDetails list={order.ingredients}/>
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
