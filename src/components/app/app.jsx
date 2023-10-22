import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "../header/header";
import Constructor from "../constructor/constructor";
import Modal from "../modal/modal";
import IngredientDetails from "../modal/ingredient-details/ingredient-details";
import OrderDetails from "../modal/order-details/order-details";
import { getApiData } from "../../service/actions/app";
import appStyles from "./app.module.css";

function App() {
  const { modalOrderStatus, modalIngrStatus } = useSelector(
    (state) => state.modal
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getApiData());
  }, []);

  const stateModal = () => {
    if (modalIngrStatus || modalOrderStatus) return true;
  };
  return (
    <>
      <Header className={appStyles.header} />
      <Constructor />
      {stateModal() && (
        <Modal title={modalIngrStatus ? "Детали ингредиента" : null}>
          {modalOrderStatus ? (
            <OrderDetails />
          ) : modalIngrStatus ? (
            <IngredientDetails />
          ) : null}
        </Modal>
      )}
    </>
  );
}

export default App;
