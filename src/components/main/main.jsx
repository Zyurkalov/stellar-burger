import React from "react";

import BurgerIngredients from "./burger-ingredients/burger-ingredients";
import BurgerConstructor from "./burger-constructor/burger-constructor";
import Template from "./template/template";
import OrderDetails from "./order-details/order-details";
import mainStyles from "./main.module.css";

function AppMain({ data }) {
  const [ingredients, setIngredients] = React.useState([]);
  const [newAnalysis, getAnalysis] = React.useState([]);
  const[status, orderStatus] = React.useState(false)

  const addIngredient = (ingredient) => {
    setIngredients([...ingredients, ingredient]);
  };

  const removeIngredient = (index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };
  const seeAnalysis = (analysis) => {
      getAnalysis([analysis])
  };
  const getOrderStatus = () => (
    orderStatus(!status)
  )

  return (
    <>
      <main className={mainStyles.main}>
        <h1 className="text text_type_main-large">Соберите бургер</h1>
        <div className={mainStyles.container}>
          <BurgerIngredients 
            addIngredient={addIngredient} 
            data={data} 
          />
          <BurgerConstructor
            ingredients={ingredients}
            removeIngredient={removeIngredient}
            seeAnalysis={seeAnalysis}
            orderStatus={getOrderStatus}
          />
        </div>
      </main>
      <Template analysis={newAnalysis}/>
      <OrderDetails orderStatus={status} toggleStatus={getOrderStatus}/>
    </>
  );
}
export default AppMain;
