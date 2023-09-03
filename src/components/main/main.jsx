import BurgerIngredients from "./burger-ingredients/burger-ingredients"
import BurgerConstructor from "./burger-constructor/burger-constructor"
import mainStyles from "./main.module.css"

function AppMain() {
return(
  <main>
    <h1>Соберите бургер</h1>
    <BurgerIngredients />
    <BurgerConstructor />
  </main>
  )
}
export default AppMain