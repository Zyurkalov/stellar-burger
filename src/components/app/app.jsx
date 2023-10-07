import React, { useEffect, useState, useCallback,} from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "../header/header";
import Constructor from "../constructor/constructor";
import Modal from "../modal/modal";

import appStyles from "./app.module.css";
import getIngrApi from "../../utils/burger-api";
import IngredientDetails from "../modal/ingredient-details/ingredient-details";
import OrderDetails from "../modal/order-details/order-details";
import { makeOrderApi } from "../../utils/makeOrder-api";
import { getData } from "../../service/actions/app";
import { getApiData } from "../../service/actions/app";


function App() {
  // --- запрос данных с сервера ---
  const [isLoading, setIsLoading] = useState(false);
  const errorState = {status: false, text: ''}
  const [error, setError] = useState(errorState);
  
  const { orderStatus, ingrStatus } = useSelector(state => state.modal)
  console.log(`orderStatus: ${orderStatus}`) 
  console.log(`ingrStatus: ${ingrStatus}`) 

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getApiData())
  }, [])

  // --- модули для Modal ---
  const defaultStatus = {
    orderStatus: { status: false, number: "" },
    ingrStatus: { status: false, ingr: {} },
  };
  const [state, setState] = React.useState(defaultStatus);

  // const toggleOrderModal =
  //   (value) => {
  //     makeOrderApi(value)
  //       .then((res) => {
  //         const orderNumber = res.order.number;

  //         setState({
  //           ...state,
  //           orderStatus: { status: true, number: orderNumber },
  //         });
  //       })
  //       .catch((error) => {
  //         console.log("Ошибка при отправке номера заказа: ", error);
  //       });
  //   };

  const toggleIngrModal = useCallback(
    (analysis) => {
      setState((prevStatus) => ({
        ...prevStatus,
        // вызов модального окна
        // ingrStatus: { status: true, ingr: [analysis] },
      }));
    },
    [setState]
  );
  const primaryModal = useCallback(() => {
    setState(defaultStatus);
  }, [useState]);

  // const stateModal = Object.values(state).some((obj) => obj.status === true);
  const stateModal = () => {
    if (ingrStatus || orderStatus)
    return true
  }


  return (
    <>
      <Header className={appStyles.header} />
        <Constructor
          // toggleIngrModal={toggleIngrModal}
          // toggleOrderModal={toggleOrderModal}
        />
      {stateModal() && (
        <Modal
          primaryModal={primaryModal}
          title={ingrStatus ? "Детали ингредиента" : null}
        >
          {orderStatus ? <OrderDetails number={state.orderStatus.number}/> : null}
          
          {ingrStatus ? (
            <IngredientDetails analysis={state.ingrStatus.ingr} />
          ) : null}
        </Modal>
      )}
    </>
  );
}

export default App;
