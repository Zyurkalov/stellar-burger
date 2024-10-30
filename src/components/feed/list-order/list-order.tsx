import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

import { IngredientsOrderDetails } from "./ingredients-order-details/ingredients-order-details";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { StatusOrder } from "../status-order/status-order";
import { useTimezone } from "../../../utils/hooks/useTimezone";

import { FC, useEffect } from "react";
import { TListOrders } from "../../../types/types";

import style from "./list-order.module.scss";
import mainStyle from "../../constructor/constructor.module.css"
import { ScrollBar } from "../../ui-kit/ScrollBar";

export const ListOrder: FC<{data: TListOrders[], addOrder: Function}> = ({data, addOrder}) => {

  useEffect(() => {
    if (data) {
      data.forEach(order => addOrder(order));
    }
  }, [data, addOrder]);

  if (!data) {
    return <h2>Loading...</h2>;
  }

  return (
    // <ScrollBar extraClass={`${style.mainContainer} ${style.scrollBar}`}>
    <ScrollBar extraClass={style.height}>
       <ListComponent arr={data} addOrder={addOrder}/>
    </ScrollBar>
  )
}

function ListComponent ( { arr, addOrder }: { arr: TListOrders[], addOrder: Function } )  {
  const location = useLocation()
  const timezone = useTimezone()

  return (
    <>
    {arr.map((order, index) => {
      const { number, createdAt, name, status, ingredients} = order
      addOrder(order)
      return (
        <li className={clsx(style.cards, mainStyle.shadow)} key={index}>
          <Link
            key={index}
            to={`${location.pathname}/${number}`}
            state={{
              background: location,
              order: order,
              from: location.pathname,
            }}
            className={style.cards__links}
          >
            <div className={style.cards__info}>
              <span className="text text_type_digits-default">{`#${number}`}</span>
              <div className={clsx(`text text_type_main-small`, style.cards__data)}>
                <FormattedDate date={new Date(createdAt)} />
                <span>{timezone}</span>
              </div>
            </div>
            <div>
              <h2 className={clsx(`text text_type_main-medium`, style.card__title)}>
                {name}
              </h2>
              {location.pathname === "/feed" ? null : (
                <StatusOrder value={status} />
              )}
            </div>
            <div>
              <IngredientsOrderDetails list={ingredients} />
            </div>
          </Link>
        </li>
      );
    })}
  </>
  )
}
