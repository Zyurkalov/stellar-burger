import { useState, useEffect } from "react";
import ListOrder from "../../feed/list-order/list-order"
import { useCookie } from "../../../utils/useCookie"
import { useDispatch, useSelector } from "react-redux"
import { connect, disconnect } from "../../../service/actions/ws-action"


const ProfileOrders = () => {
    // const {orders} = hardData
    const dispatch = useDispatch()
    const getOrders = useSelector((state) => state.ws.orders);

    const [orderData, setOrderData] = useState({ orders: null });
    const { orders } = orderData;

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
    //
    useEffect(() => {
        dispatch(connect(`orders?token=${useCookie.queryToken()}`));
        return () => {
          dispatch(disconnect())
      }
    },[dispatch])
    
    useEffect(() => {
      if(getOrders.length > 0) {
        setOrderData(({orders: getOrders[0]?.orders || null}))
      }
    },[getOrders])

    return (
      orders === null ? null :
        <ListOrder data={orders.slice().reverse()} addOrder={addToListOrders}></ListOrder>
    )
}

export default ProfileOrders