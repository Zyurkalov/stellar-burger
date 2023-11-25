import Modal from "../components/modal/modal";
import OrderDetails from "../components/modal/order-details/order-details";
import Constructor from "../components/constructor/constructor";
import { useDispatch, useSelector } from "react-redux";
import { getApiData } from "../service/actions/app";
import { useEffect } from "react";

export function Home(state) {
  
  const dispatch = useDispatch();
  const { modalIngrStatus, modalOrderStatus } = state.state;
  // const { data } = useSelector(
  //   (store) => store.dataList
  // );
  const stateModal = modalIngrStatus || modalOrderStatus;

  useEffect(() => {
      dispatch(getApiData());
  }, []);

  return (
    <>
      <Constructor />
      {stateModal && (
        <Modal title={modalIngrStatus ? "Детали ингредиента" : null}>
          {modalOrderStatus ? (
            <OrderDetails />
          // ) : modalIngrStatus ? (
          //   <IngredientDetails />
          ) : null}
        </Modal>
      )}
    </>
  );
}

//добавить проверку для пропсов
