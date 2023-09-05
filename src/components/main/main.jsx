import React from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredients from "./burger-ingredients/burger-ingredients"
import BurgerConstructor from "./burger-constructor/burger-constructor"
import mainStyles from "./main.module.css"

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
  const seeAnalysis = (ingredient) => {
  };

  return (
    <>
    <main className={mainStyles.main}>
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <div className={mainStyles.container}>
        <BurgerIngredients addIngredient={addIngredient} data={data} />
        <BurgerConstructor ingredients={ingredients} removeIngredient={removeIngredient} seeAnalysis={seeAnalysis}/>
      </div>
    </main>
    <template className={`${mainStyles.templ} ${mainStyles.templ_disabled}`}>
      <div className={`p-10 ${mainStyles.templ__ingr}`}>
        <div className={mainStyles.templ__headCont}>
          <h2 className="text text_type_main-large">Детали ингредиента</h2>
          <CloseIcon type="primary"/>
        </div>
        <section className={mainStyles.templ__section}>
          <img scr='' className={mainStyles.templ__img}></img>
          <div>
            <h3 className="mb-8 text text_type_main-medium">Имя</h3>
            <div className={mainStyles.templ__Ingr}> 
              <div className={mainStyles.templ__ingrInfo}>
                <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
                <span className="text text_type_main-default text_color_inactive">244,4</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </template>
    </>
  );
}
export default AppMain