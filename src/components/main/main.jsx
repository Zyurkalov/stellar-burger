import React from "react";
import PropTypes from "prop-types";

import BurgerIngredients from "./burger-ingredients/burger-ingredients";
import BurgerConstructor from "./burger-constructor/burger-constructor";
import Template from "./template/template";
import OrderDetails from "./order-details/order-details";
import mainStyles from "./main.module.css";

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
  const [ingredients, setIngredients] = React.useState([defBun]);
  const [newAnalysis, getAnalysis] = React.useState([]);
  const [status, orderStatus] = React.useState(false);
  const [count, setCount] = React.useState(0);

  AppMain.propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
        proteins: PropTypes.number,
        fat: PropTypes.number,
        carbohydrates: PropTypes.number,
        calories: PropTypes.number,
        price: PropTypes.number,
        image: PropTypes.string,
        image_mobile: PropTypes.string,
        image_large: PropTypes.string,
        __v: PropTypes.number,
      })
    ).isRequired,
  };

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
    getAnalysis([analysis]);
  };
  const getOrderStatus = () => orderStatus(!status);

  return (
    <>
      <main className={mainStyles.main}>
        <h1 className="text text_type_main-large">Соберите бургер</h1>
        <div className={mainStyles.container}>
          <BurgerIngredients addIngredient={addIngredient} data={data} />
          <BurgerConstructor
            ingredients={ingredients}
            removeIngredient={removeIngredient}
            seeAnalysis={seeAnalysis}
            orderStatus={getOrderStatus}
          />
        </div>
      </main>
      <Template analysis={newAnalysis} />
      <OrderDetails orderStatus={status} toggleStatus={getOrderStatus} />
    </>
  );
}
export default AppMain;
