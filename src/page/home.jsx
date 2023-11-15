import Modal from "../components/modal/modal";
import OrderDetails from "../components/modal/order-details/order-details";
import IngredientDetails from "../components/modal/ingredient-details/ingredient-details";
import Constructor from "../components/constructor/constructor";

export function Home(state) {
    const { stateModal, modalIngrStatus, modalOrderStatus, userAuthStatus } = state.state;
    
    return (
        <>
        <Constructor />
        {stateModal && (
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

  //добавить проверку для пропсов