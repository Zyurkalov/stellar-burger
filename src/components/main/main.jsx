import React from "react";
import BurgerIngredients from "./burger-ingredients/burger-ingredients"
import BurgerConstructor from "./burger-constructor/burger-constructor"
import mainStyles from "./main.module.css"

function AppMain() {

  const [setIngridient, addIngridient] = React.useState([])

  const getIngridients = (ingridient) => {
    addIngridient(ingridient)
  }


return(
  <main className={mainStyles.main}>
    <h1 className="text text_type_main-large">Соберите бургер</h1>
    <div className={mainStyles.container}>
        <BurgerIngredients addNewIngridient={getIngridients}/>
        <BurgerConstructor sendAddedIngridients={setIngridient}/>
    </div>
    
  </main>
  )
}
export default AppMain