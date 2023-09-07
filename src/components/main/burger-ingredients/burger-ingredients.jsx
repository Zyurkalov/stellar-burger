import React from "react";
import PropTypes from 'prop-types';

import { Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerCart from "./burger-cart/burger-cart";
import style from "./burger-ingredients.module.css";

function BurgerIngredients({ addIngredient, data }) {
    
    BurgerIngredients.propTypes = {
      addIngredient: PropTypes.func.isRequired,
      data: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
        proteins: PropTypes.number,
        fat: PropTypes.number,
        carbohydrates: PropTypes.number,
        calories: PropTypes.number,
        price: PropTypes.number,
        image: PropTypes.string,
        image_mobile: PropTypes.string,
        image_large: PropTypes.string,
        __v: PropTypes.number,
      })).isRequired
    };

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
            <div className={style.cardContainer}>
              {decompositionArr(category)}
              </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default BurgerIngredients;
