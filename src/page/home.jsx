import Modal from "../components/modal/modal";
import OrderDetails from "../components/modal/order-details/order-details";
import Constructor from "../components/constructor/constructor";
import { useSelector } from "react-redux";

export function Home() {
  
  const { modalIngrStatus, modalOrderStatus } = useSelector((store) => store.modal)
  const stateModal = modalIngrStatus || modalOrderStatus;

  return (
    <>
      <Constructor />
      {stateModal && (
        <Modal title={modalIngrStatus ? "Детали ингредиента" : null}>
          {modalOrderStatus ? (
            <OrderDetails />
          ) : null}
        </Modal>
      )}
    </>
  );
}

