import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerCart from "./burger-cart/burger-cart";
import { data } from "../../../utils/data";
import style from "./burger-ingredients.module.css";
import { checkPropTypes } from "prop-types";

function BurgerIngredients(props) {
  const [setIngredient, addIngredient] = React.useState([]);

  const handleAddIngridient = (ingridients) => {
    const updatedIngridients = [...setIngredient, ingridients];
    addIngredient(updatedIngridients);

    props.addNewIngridient(updatedIngridients);
  }
  const decompositionArr = (category) => {
    const filteredData = data.filter((item) => item.type === category);
    return filteredData.map((item) => <BurgerCart key={item.key} addNewIngridient={handleAddIngridient} {...item} />);
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
        {categories.map((category) => (
          <div key={category}>
            <h2 className="mb-6 mt-10 text text_type_main-medium">
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
