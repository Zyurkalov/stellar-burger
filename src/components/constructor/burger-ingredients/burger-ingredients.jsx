import React, { useCallback } from "react";
import PropTypes from "prop-types";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropType } from "../../../utils/prop-types";
import BurgerCart from "./burger-cart/burger-cart";
import style from "./burger-ingredients.module.css";

function BurgerIngredients({
  addIngredient,
  data,
  toggleIngrModal,
  ingrLength,
}) {
  const decompositionArr = useCallback(
    (category) => {
      const filteredData = data.filter((item) => item.type === category);
      return filteredData.map((item) => (
        <BurgerCart
          key={item.key}
          addIngr={addIngredient}
          toggleIngrModal={toggleIngrModal}
          {...item}
        />
      ));
    },
    [addIngredient, data, toggleIngrModal]
  );

  const setCategories = ["bun", "sauce", "main"];
  const [current, setCurrent] = React.useState("one");

  const setTab = (tab) => {
    setCurrent(tab);
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };
  const idHeader = (category) => {
    return category === "bun" ? "one" : category === "sauce" ? "two" : "three";
  };
  return (
    <div>
      <nav style={{ display: "flex" }} className="mt-5">
        <Tab
          id="one"
          value="one"
          active={current === "one"}
          onClick={() => setTab("one")}
        >
          Булки
        </Tab>
        <Tab
          id="two"
          value="two"
          active={current === "two"}
          onClick={() => setTab("two")}
        >
          Соусы
        </Tab>
        <Tab
          id="three"
          value="three"
          active={current === "three"}
          onClick={() => setTab("three")}
        >
          Начинки
        </Tab>
      </nav>

      <section className={`${style.cardSection} ${style.scrollBar}`}>
        {setCategories.map((category, index) => (
          <div
          id={idHeader(category)}
          key={index}
          className={`${style.categories} ${
            ingrLength === 0 && category !== "bun"
              ? style.disabled
              : ''
          }`}
          disabled={ingrLength === 0 && category !== "bun"}
        >
            <h2
              className={`mb-6 mt-10 text text_type_main-medium ${style.cardSection__header}`}
            >
              {category === "bun"
                ? "Булки"
                : category === "sauce"
                ? "Соусы"
                : "Начинки"}
            </h2>
            <div className={style.cardContainer}>
              {decompositionArr(category)}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
BurgerIngredients.propTypes = {
  addIngredient: PropTypes.func.isRequired,
  toggleIngrModal: PropTypes.func.isRequired,
  data: ingredientPropType,
};

export default BurgerIngredients;
