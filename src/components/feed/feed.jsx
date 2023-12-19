import { useState, useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";

import { connect, disconnect } from "../../service/actions/ws-action";
import ListOrder from "./list-order/list-order";
import BoardOrder from "./board-order/board-order";
import mainStyles from "../constructor/constructor.module.css"

function FeedComponent()  {
    const [mainClass, setMainClass] = useState(mainStyles.main);
    const [orderData, setOrderData] = useState({ orders: null, total: null, totalToday: null });
    // const {orders, total, totalToday} = hardData
    const dispatch = useDispatch()
    const getOrders = useSelector((state) => state.ws.orders);
    const { orders, total, totalToday } = orderData;

    let listOrderDone = []
    let listOrderWorking = []
    function addToListOrders(value) {
      const { status, number } = value;
      if (status === 'canceled') {
        return;
      }
      if (status === 'done') {
        listOrderDone.push(number);
      } else {
        listOrderWorking.push(number);
      }
    }
    useEffect(() => {
        dispatch(connect('orders/all'))
      return () => {
        dispatch(disconnect())
      }
    },[])
    
    useEffect(() => {
      if(getOrders.length > 0) {
        const [{ orders, total, totalToday }] = getOrders;
        setOrderData({ orders: orders, total: total, totalToday: totalToday }); 
      }
    },[getOrders])

    // переписать под отдельный хук:
    useEffect(() => {
      const timer = setTimeout(() => {
        setMainClass(`${mainStyles.main} ${mainStyles.main_visible}`);
      }, 0);
      return () => clearTimeout(timer);
    }, []); 
    
    return (
      orders === null ? null :
        <main className={mainClass}>
          <h1 className={`text text_type_main-large mb-5`}>Лента заказов</h1>
          <div className={`${mainStyles.container} ${mainStyles.container_feedPage}`}>
              <ListOrder data={orders} addOrder={addToListOrders}></ListOrder>
              <BoardOrder doneList={listOrderDone} workingList={listOrderWorking} total={total} totalToday={totalToday}></BoardOrder>
          </div>
        </main>
      );
}

export default FeedComponent