import {useEffect, useState} from 'react'
import { useAppDispatch, useAppSelector } from "../../../utils/hooks/useAppStore";
// import image from "../../../images/done.svg";
// import style from "./order-details.module.css";
import { useLocation, useParams } from "react-router-dom";
import { getOrderNumberDetails } from '../../../service/actions/order-number';
import { OrderComponent as Order} from './order-component';


const OrderDetails = () => {
  // const { orderNumber, orderRequest, orderFailed, orderSuccess, text } = useAppSelector((state) => state.makeOrder)
  const { order } = useAppSelector((store) => store.getOrderNumber);
  const { number } = useParams()
  const location = useLocation()
  const dispatch = useAppDispatch()
  const background: string | undefined = location.state?.background

  const [loaded, setLoaded] = useState(false)
  const [content, setContent] = useState<JSX.Element | null>(null);

  useEffect(() => {
    if (background !== undefined ) {
      setContent(Order(number, background));
      setLoaded(true)
    } else {
      dispatch(getOrderNumberDetails(number))
    }
  },[])

  useEffect(() => {
    console.log(order)
    if (order) {
      setContent(Order(order.number));
      setLoaded(true);
    }
  }, [order]);
  
  return (
    !loaded && background === undefined
      ? (<>
          <p className="mb-2 text text_type_main-medium">
          Ищем заказ...
          </p>
        </>)
      : content !== null
        ? content
        : <>
            <p className="mb-2 text text_type_main-medium">
              Похоже, наш новый стажер опять решил заглянуть внутрь ксеноморф-яйца. 
              Мы работаем над проблемой. Повторите попытку позже. И не пытайтесь покинуть станцию.
            </p>
          </>
  );
}
export default OrderDetails;

// Важно учесть, что по сокет-соединению сервер возвращает только 50 последних заказов и интересующего нас заказа среди них может не быть. 
// Если нужный заказ не пришел по сокет-соединению, его следует запросить с сервера напрямую запросом:
// GET https://norma.nomoreparties.space/api/orders/{номер заказа} 
