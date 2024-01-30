import {FC} from 'react'
import { useAppSelector } from "../../../utils/hooks/useAppStore";
import image from "../../../images/done.svg";
import style from "./order-details.module.css";
import { useLocation, useParams } from "react-router-dom";
import { getOrderNumberDetails } from '../../../service/actions/order-number';

const OrderDetails = () => {
  const { orderNumber, orderRequest, orderFailed, orderSuccess, text } = useAppSelector((state) => state.makeOrder)
  const { order } = useAppSelector((store) => store.getOrderNumber);
  const { number } = useParams()
  const location = useLocation()
  const background = location.state?.background

  const checkOrder = async () => {
    if (background !== undefined) {
      console.log(true)
      return true;
    } else {
      try {
        await getOrderNumberDetails(number);
        console.log("getOrder")
        return true;
      } catch (err) {
        console.log(false)
        return false;
      }
    }
  };

  return (
    <div className={`${style.mainCont}`}>
      <>
          <h2 className="mb-6 text text_type_digits-large">{number}</h2>
          <p className="text text_type_main-medium">идентификатор заказа</p>
          <img src={image} alt="заказ принят" className="mt-15 mb-15" />
          <p className="mb-2 text text_type_main-default">
            Ваш заказ начали готовить
          </p>
          <span className="text text_type_main-default text_color_inactive">
            Дождитесь готовности на орбитальной станции
          </span>
        </> 
      {/* {orderRequest ? (
        <>
          <p className="mb-2 text text_type_main-medium">
          Собираем заказ...
          </p>
        </>
      ) : orderSuccess && orderNumber ? ( */}
        
      {/* ) : (
        <>
          <p className="mb-2 text text_type_main-medium">
            Похоже, наш новый стажер опять решил заглянуть внутрь ксеноморф-яйца. 
            Мы работаем над проблемой. Повторите попытку позже. И не пытайтесь покинуть станцию.
          </p>
          {console.log(`ошибка при отправке заказа: ${text}`)}
        </>
      )} */}
    </div>
  );
}
export default OrderDetails;

// Важно учесть, что по сокет-соединению сервер возвращает только 50 последних заказов и интересующего нас заказа среди них может не быть. 
// Если нужный заказ не пришел по сокет-соединению, его следует запросить с сервера напрямую запросом:
// GET https://norma.nomoreparties.space/api/orders/{номер заказа} 
