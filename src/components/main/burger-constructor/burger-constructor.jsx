import {
  CurrencyIcon,
  Button,
  LockIcon,
  DeleteIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect } from "react";
import style from "./burger-constructor.module.css";
import GetBun from "./get-bun/get-bun";

function BurgerConstructor({
  ingredients,
  removeIngredient,
  seeAnalysis,
  orderStatus,
}) {
  const totalPrice = ingredients.reduce(
    (acc, ingredient) => acc + ingredient.props.price,
    0
  );
  const handleRemoveIngredient = (index) => {
    removeIngredient(index);
  };

  const bunFiltr = () => {
    const filteredBuns = ingredients.filter(
      (ingr) => ingr.props.type === "bun"
    );
    const lastBun = filteredBuns[filteredBuns.length - 1];
    return lastBun || {};
  };

  const fillinFiltr = () => {
    return ingredients.filter((ingr) => ingr.props.type !== "bun");
  };

  const borderStyleUp = [true, false];

  return (
    <section aria-label="Конструктор" className={`mt-5 ${style.section}`}>
      <ul>
        <GetBun
          bun={bunFiltr()}
          seeAnalysis={seeAnalysis}
          bordStyle={borderStyleUp[0]}
        />
        <ul className="custom-scroll">
          {fillinFiltr().map((ingredient, index) => (
            <li
              key={index}
              className={`mb-4 ${style.component}`}
              onClick={() => seeAnalysis(ingredient.props)}
            >
              <div>
                <DragIcon />
              </div>
              
              <div className={` ${style.cart}`}>
                <img
                  src={ingredient.props.image_mobile}
                  className={style.image}
                  alt={ingredient.props.name}
                />
                <h3 className={`text text_type_main-default ${style.cardName}`}>
                  {ingredient.props.name}
                </h3>
                <div className={`${style.price}`}>
                  <p className={"text text_type_digits-default"}>
                    {ingredient.props.price}
                  </p>
                  <CurrencyIcon />
                </div>
                <div style={{cursor: "pointer"}}>
                  <DeleteIcon onClick={() => handleRemoveIngredient(index)} />
                </div>
                
              </div>
            </li>
          ))}
        </ul>
        <GetBun
          bun={bunFiltr()}
          seeAnalysis={seeAnalysis}
          bordStyle={borderStyleUp[1]}
        />
      </ul>
      <div className={`mt-8 ${style.price}`}>
        <div className={`${style.price} ${style.price_icon}`}>
          <h3 className="text text_type_digits-medium">{totalPrice}</h3>
          <CurrencyIcon />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={orderStatus}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

export default BurgerConstructor;
