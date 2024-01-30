
import BurgerIngredients from "./burger-ingredients/burger-ingredients";
import BurgerConstructor from "./burger-constructor/burger-constructor";

import mainStyles from "./constructor.module.css";
import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export function ConstructorComponent() {
  const [mainClass, setMainClass] = useState(mainStyles.main);

  // переписать под отдельный хук:
  useEffect(() => {
    const timer = setTimeout(() => {
      setMainClass(`${mainStyles.main} ${mainStyles.main_visible}`);
    }, 0);
    return () => clearTimeout(timer);
  }, []); 
  
  return (
    <main className={mainClass}>
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

export default ConstructorComponent;
