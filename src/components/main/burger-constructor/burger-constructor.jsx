import {
  CurrencyIcon,
  Button,
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { prop } from "react";
import PropTypes from "prop-types";
import style from "./burger-constructor.module.css";
import GetBun from "./get-bun/get-bun";

function BurgerConstructor({
  ingredients,
  removeIngredient,
  seeAnalysis,
  orderStatus,
}) {
  const checkPropsIngre = PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  );
  BurgerConstructor.propTypes = {
    ingredients: checkPropsIngre.isRequired,
    removeIngredient: checkPropsIngre.isRequired,
    seeAnalysis: PropTypes.func.isRequired,
    orderStatus: PropTypes.func.isRequired,
  };
  const totalPrice = ingredients.reduce((acc, ingredient) => {
    if (ingredient.props.type === "bun") {
      return acc + ingredient.props.price * 2;
    } else {
      return acc + ingredient.props.price;
    }
  }, 0);

  const handleRemoveIngredient = (index) => {
    removeIngredient(index);
  };

  // const bunFiltr = () => {
  //   return ingredients.filter((ingr) => ingr.props.type === "bun"
  //   );
  // };
  const fillinFiltr = () => {
    return ingredients.filter((ingr) => ingr.props.type !== "bun") || {};
  };
  let bun = ingredients[0].props;
  // const borderStyleUp = [true, false];

  return (
    <section aria-label="Конструктор" className={`mt-5 ${style.section}`}>
      <ul>
        <li
          className={`mb-4 ${style.component}`}
          onClick={() => seeAnalysis(bun)}
        >
          <div style={{ visibility: "hidden" }}>
            <DragIcon />
          </div>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image_mobile}
          />
        </li>
        <ul
          id="scrollBar"
          className={` ${style.listComponents} ${style.scrollBar}`}
        >
          {fillinFiltr().map((ingredient, index) => (
            <li
              key={index}
              className={`mb-4 ${style.component}`}
              onClick={() => seeAnalysis(ingredient.props)}
            >
              <div>
                <DragIcon key={index} />
              </div>
              <ConstructorElement
                key={index}
                text={ingredient.props.name}
                price={ingredient.props.price}
                thumbnail={ingredient.props.image_mobile}
                handleClose={() => handleRemoveIngredient(index + 1)}
              />
            </li>
          ))}
        </ul>
        <li className={`${style.component}`} onClick={() => seeAnalysis(bun)}>
          <div style={{ visibility: "hidden" }}>
            <DragIcon />
          </div>

          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image_mobile}
          />
        </li>
        {/* <GetBun
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
        /> */}
      </ul>
      <div className={`mt-8 mr-4 ${style.price}`}>
        <div className={`${style.price} ${style.price_icon}`}>
          <h3 className="text text_type_digits-medium">{totalPrice}</h3>
          <CurrencyIcon />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={orderStatus}
          // onClick={() => test(ingredients)}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

export default BurgerConstructor;
