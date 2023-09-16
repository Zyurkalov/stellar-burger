import React from "react";
import PropTypes from "prop-types";

import { ingredientPropType } from "../../utils/prop-types";
import BurgerIngredients from "./burger-ingredients/burger-ingredients";
import BurgerConstructor from "./burger-constructor/burger-constructor";

import mainStyles from "./constructor.module.css";
import defBun from "../../utils/defaultBun";

function Constructor({ data, toggleOrderModal, toggleIngrModal }) {
  const [ingredients, setIngredients] = React.useState([defBun]);

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

  return (
    <main className={mainStyles.main}>
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <div className={mainStyles.container}>
        <BurgerIngredients 
          addIngredient={addIngredient} 
          data={data} 
          toggleIngrModal={toggleIngrModal}
        />
        <BurgerConstructor
          ingredients={ingredients}
          removeIngredient={removeIngredient}
          toggleOrderModal={toggleOrderModal}
        />
      </div>
    </main>
  );
}
Constructor.propTypes = {
  data: ingredientPropType,
  toggleOrderModal: PropTypes.func.isRequired,
  toggleIngrModal: PropTypes.func.isRequired,
};
export default Constructor;
