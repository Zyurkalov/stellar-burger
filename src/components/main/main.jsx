import React from "react";

import {ingredientPropType} from "../../utils/prop-types"
import BurgerIngredients from "./burger-ingredients/burger-ingredients";
import BurgerConstructor from "./burger-constructor/burger-constructor";
import Modal from "./modal/modal";

import mainStyles from "./main.module.css";
import IngredientDetails from "./modal/ingredient-details/ingredient-details";
import OrderDetails from "./modal/order-details/order-details"

// значение для булки по умолчанию
let defBun = {
  props: {
    _id: "60666c42cc7b410027a1a9b1",
    name: "Краторная булка N-200i",
    type: "bun",
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 30,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    __v: 0,
  },
};

function AppMain({ data }) {
  const defaultStatus = {
    orderStatus: { status: false },
    ingrStatus: { status: false, ingr: {} },
    profileStatus: { status: false },
  };
  const [state, setState] = React.useState(defaultStatus);
  const [ingredients, setIngredients] = React.useState([defBun]);
  const [newAnalysis, setNewAnalysis] = React.useState([]);
  const [made, orderStatus] = React.useState(false);
  const [opener, setOpener] = React.useState(false);

  const addIngredient = (ingr) => {
    const updatedIngr = [...ingredients];
    if (
      updatedIngr.length > 0 &&
      updatedIngr[0].props.type === ingr.props.type
    ) {
      updatedIngr[0] = ingr;
    } else {
      updatedIngr.push(ingr);
    }
    setIngredients(updatedIngr);
  };

  const removeIngredient = (index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };

  const seeAnalysis = (analysis) => {
    // setOpener(!opener);
    setNewAnalysis([analysis]);
  };
  const activateOrderStatus = () => {
    setOpener(!opener);
    orderStatus(!made);
  };
  const removeStatus = () => {
    setOpener(false);
    orderStatus(false);
    // setNewAnalysis([]);
  };

  
  function toggleOrderStatus() {
    setState({
      ...state,
      orderStatus: { status: true },
    });
  }
  function toggleIngrStatus(analysis) {
    setState((prevStatus) => ({
      ...prevStatus,
      ingrStatus: { status: true, ingr: [analysis] },
    }));
  }
  function primaryStatus() {
    setState(defaultStatus);
  }

const stateModal = Object.values(state).some((obj) => obj.status === true)
  // React.useEffect(() => {
  //   console.log(status.ingrStatus.ingr);
  // }, [status]);
  return (
    <>
      <main className={mainStyles.main}>
        <h1 className="text text_type_main-large">Соберите бургер</h1>
        <div className={mainStyles.container}>
          <BurgerIngredients addIngredient={addIngredient} data={data} />
          <BurgerConstructor
            ingredients={ingredients}
            removeIngredient={removeIngredient}
            toggleIngrModal={toggleIngrStatus}
            toggleOrderModal={toggleOrderStatus}
          />
        </div>
      </main>
      {/* <Modal
        opener={opener}
        orderStatus={made}
        analysis={newAnalysis}
        removeStatus={removeStatus}
      /> */}
      <button onClick={toggleOrderStatus}>Click me!</button>
      {stateModal && (
      <Modal primaryStatus={primaryStatus} title={state.ingrStatus.status ? "Детали ингредиента": null}>
        {state.orderStatus.status ? <OrderDetails /> : null}
        {state.ingrStatus.status ? <IngredientDetails analysis={state.ingrStatus.ingr}/> : null}
      </Modal>
      )}

    </>
  );
}
  AppMain.propTypes = {
    data: ingredientPropType,
  };
export default AppMain;
