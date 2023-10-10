
import BurgerIngredients from "./burger-ingredients/burger-ingredients";
import BurgerConstructor from "./burger-constructor/burger-constructor";

import mainStyles from "./constructor.module.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function Constructor() {
  return (
    <main className={mainStyles.main}>
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <div className={mainStyles.container}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </div>
    </main>
  );
}
export default Constructor;
