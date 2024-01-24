
import { Link, useLocation, useParams } from "react-router-dom";

import { IngredientsOrderDetails } from "./ingredients-order-details/ingredients-order-details";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { StatusOrder } from "../status-order/status-order";
import { useTimezone } from "../../../service/useTimezone";

import PropTypes from 'prop-types';
import style from "./list-order.module.css";
import mainStyle from "../../constructor/constructor.module.css"
import { FC } from "react";
import { TListOrders } from "../../../Types";

export const ListOrder: FC<{data: TListOrders[], addOrder: Function}> = ({data, addOrder}) => {
  const location = useLocation()
  const timezone = useTimezone()
  // const userTimezone: string | null | undefined = Intl.DateTimeFormat('en', { timeZoneName: 'short' }).formatToParts(Date.now()).find(part => part.type === 'timeZoneName').value;
  // let userTimezone: string | null = null;

  // if (typeof Intl !== 'undefined') {
  //     userTimezone = Intl.DateTimeFormat('en', { timeZoneName: 'short' }).formatToParts(Date.now())
  //         .find((part) => part.type === 'timeZoneName')?.value || null;
  // }

  return (
    !data ? <h2>Loading...</h2> :
    <ul className={`${style.mainContainer} ${style.scrollBar}`}>
      {data.map((order, index) => {
        const { number, createdAt, name, status, ingredients} = order
        addOrder(order)
        return (
          <li className={`${style.container} ${mainStyle.shadow}`} key={index}>
            <Link key={index} to={`${location.pathname}/${number}`} state={{ background: location, order: order, from: location.pathname}} className={`${style.links}`}>
            <div className={style.flexContainer}>
              <span className="text text_type_digits-default">{`#${number}`}</span>
              <div className={`text text_type_main-small ${style.data}`}>
                <FormattedDate date={new Date(createdAt)} />
                <span>{timezone}</span>
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
            {/* <IngredientsOrderDetails list={ingredients} number={number}/> */}
            <IngredientsOrderDetails list={ingredients}/>
            </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

// ListOrder.propTypes = {
//   data: PropTypes.arrayOf(PropTypes.shape({
//     ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
//     _id: PropTypes.string.isRequired,
//     status: PropTypes.string.isRequired,
//     number: PropTypes.number.isRequired,
//     createdAt: PropTypes.string.isRequired,
//     updatedAt: PropTypes.string.isRequired,
//   })).isRequired,
//   addOrder: PropTypes.func.isRequired

// };
