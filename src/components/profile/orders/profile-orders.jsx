import { useState, useEffect } from "react";
import { hardData } from "../../../constatnts/hard-data"
import ListOrder from "../../feed/list-order/list-order"
import { useCookie } from "../../../utils/useCookie"
import { useParams, useSearchParams, useLocation  } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { connect, disconnect } from "../../../service/actions/wc-action"


const ProfileOrders = () => {
    const {orders} = hardData
    const dispatch = useDispatch()
    const getOrders = useSelector((state) => state.wc);
    
    const cookie = useCookie.getCookie('accessToken')
    const queryToken = cookie.replace('Bearer', '').trim()
    console.log(getOrders)

    //здесь не нужен, но пусть будет
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
        dispatch(connect(`orders?token=${queryToken}`));
      return () => {
        dispatch(disconnect())
      }
    },[])

    return (
        <ListOrder data={orders} addOrder={addToListOrders}></ListOrder>
    )
}

export default ProfileOrders