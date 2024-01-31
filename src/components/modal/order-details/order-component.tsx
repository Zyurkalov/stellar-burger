import image from "../../../images/done.svg";
import style from "./order-details.module.css";
import { NotFound404 } from "../../../page";

export const OrderComponent = (num: string | undefined, background: string | undefined = undefined) => {
  console.log(background)
    return (
      num !== undefined 
        ? <div className={`${style.mainCont}`}>
            <h2 className="mb-6 text text_type_digits-large">{num}</h2>
            <p className="text text_type_main-medium">идентификатор заказа</p>
            <img src={image} alt="заказ принят" className="mt-15 mb-15" />
            <p className="mb-2 text text_type_main-default">
              {background !== undefined ? 'Ваш заказ начали готовить' : 'Заказ готов'}
            </p>
            <span className="text text_type_main-default text_color_inactive">
            {background !== undefined ? 'Дождитесь готовности на орбитальной станции' : 'Надеемся, вы не смотрите чужие заказы'}
            </span>
      </div>
      : NotFound404
    )
} 