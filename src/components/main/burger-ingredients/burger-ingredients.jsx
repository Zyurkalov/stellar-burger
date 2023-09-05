import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerCart from "./burger-cart/burger-cart";
import style from "./burger-ingredients.module.css";
import { checkPropTypes } from "prop-types";

function BurgerIngredients({ addIngredient, data }) {
  const decompositionArr = (category) => {
    const filteredData = data.filter((item) => item.type === category);
    return filteredData.map((item) => (
      <BurgerCart key={item.key} addIngr={addIngredient} {...item} />
    ));
  };

  const categories = ["bun", "sauce", "main"];
  const [current, setCurrent] = React.useState("one");
  return (
    <div>
      <nav style={{ display: "flex" }} className="mt-5">
        <Tab value="one" active={current === "one"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === "two"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === "three"} onClick={setCurrent}>
          Начинки
        </Tab>
      </nav>

      <section className={`${style.cardSection} ${style.scrollBar}`}>
        {categories.map((category, index) => (
          <div key={index} className={`${style.categories}`}>
            <h2 className={`mb-6 mt-10 text text_type_main-medium ${style.cardSection__header}`}>
              {category === "bun" ? "Булки" : category === "sauce" ? "Соусы" : "Начинки"}
            </h2>
            <div className={style.cardContainer}>{decompositionArr(category)}</div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default BurgerIngredients;
