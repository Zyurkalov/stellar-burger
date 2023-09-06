import React from "react";
import BurgerIngredients from "./burger-ingredients/burger-ingredients";
import BurgerConstructor from "./burger-constructor/burger-constructor";
import Template from "./template/template";
import mainStyles from "./main.module.css";

function AppMain({ data }) {
  const [ingredients, setIngredients] = React.useState([]);

  const addIngredient = (ingredient) => {
    setIngredients([...ingredients, ingredient]);
  };

  const removeIngredient = (index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };

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
          />
        </div>
      </main>
      <Template />
    </>
  );
}
export default AppMain;
