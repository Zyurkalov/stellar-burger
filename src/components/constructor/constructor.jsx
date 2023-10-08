
import BurgerIngredients from "./burger-ingredients/burger-ingredients";
import BurgerConstructor from "./burger-constructor/burger-constructor";

import mainStyles from "./constructor.module.css";

function Constructor() {
  return (
    <main className={mainStyles.main}>
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <div className={mainStyles.container}>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </main>
  );
}
export default Constructor;
