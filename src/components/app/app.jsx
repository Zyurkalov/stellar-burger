import React, { useEffect, useState, useCallback, useContext } from "react";
import { useDispatch, useSelector, } from "react-redux";

import Header from "../header/header";
import Constructor from "../constructor/constructor";
import Modal from "../modal/modal";

import appStyles from "./app.module.css";
import getIngrApi from "../../utils/burger-api";
import IngredientDetails from "../modal/ingredient-details/ingredient-details";
import OrderDetails from "../modal/order-details/order-details";
import DataContext from "../../service/dataContext.js";
import { makeOrderApi } from "../../utils/makeOrder-api";
import { getData } from "../../service/actions/app";


function App() {
  // --- запрос данных с сервера ---
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const errorState = {status: false, text: ''}
  const [error, setError] = useState(errorState);
  
  
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        setError(errorState)
        const data = await getIngrApi();

        if (data.success && data.data && data.data.length > 0) {
          setData(data.data);
          dispatch(getData(data.data))
        } else {
          throw new Error("Что-то не так с полученными данными");
        }
      } catch (error) {
        setError({status: true, text: `Не удалось загрузить данные с сервера: ${error}`});
        console.error("Не удалось загрузить данные с сервера:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- модули для Modal ---
  const defaultStatus = {
    orderStatus: { status: false, number: "" },
    ingrStatus: { status: false, ingr: {} },
    profileStatus: { status: false },
    errorStatus: {status: false, text: ''}
  };
  const [state, setState] = React.useState(defaultStatus);

  const toggleOrderModal =
    (value) => {
      makeOrderApi(value)
        .then((res) => {
          const orderNumber = res.order.number;

          setState({
            ...state,
            orderStatus: { status: true, number: orderNumber },
          });
        })
        .catch((error) => {
          console.log("Ошибка при отправке номера заказа: ", error);
        });
    };
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

  const stateModal = Object.values(state).some((obj) => obj.status === true);

  return (
    <>
      <Header className={appStyles.header} />
      {/* <DataContext.Provider value={data}> */}
        <Constructor
          // data={data}
          toggleIngrModal={toggleIngrModal}
          toggleOrderModal={toggleOrderModal}
        />
      {/* </DataContext.Provider> */}
      {stateModal && (
        <Modal
          primaryModal={primaryModal}
          title={state.ingrStatus.status ? "Детали ингредиента" : null}
        >
          {state.orderStatus.status ? <OrderDetails number={state.orderStatus.number}/> : null}
          {state.ingrStatus.status ? (
            <IngredientDetails analysis={state.ingrStatus.ingr} />
          ) : null}
        </Modal>
      )}
    </>
  );
}

export default App;
