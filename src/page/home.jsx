import Modal from "../components/modal/modal";
import OrderDetails from "../components/modal/order-details/order-details";
import Constructor from "../components/constructor/constructor";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../service/actions/app";
import { useEffect } from "react";

export function Home() {
  
  const { modalIngrStatus, modalOrderStatus } = useSelector((store) => store.modal)
  const dispatch = useDispatch();

  const { data } = useSelector(
    (store) => store.dataList
  );
  const stateModal = modalIngrStatus || modalOrderStatus;

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
