import React, { useMemo, useCallback } from "react";
import {
  CurrencyIcon,
  Button,
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropType, oneIngrPropType } from "../../../utils/prop-types";
import PropTypes from "prop-types";
import style from "./burger-constructor.module.css";

function BurgerConstructor({
  ingredients,
  removeIngredient,
  toggleOrderModal,
}) {
  const totalPrice = ingredients.reduce((acc, ingredient) => {
    if (ingredient.props.type === "bun") {
      return acc + ingredient.props.price * 2;
    } else {
      return acc + ingredient.props.price;
    }
  }, 0);

  const handleRemoveIngredient = useCallback(
    (index) => {
      removeIngredient(index);
    },
    [removeIngredient]
  );

  const fillinFiltr = () => {
    return ingredients.filter((ingr) => ingr.props.type !== "bun") || {};
  };

  const findBun = () => {
    return ingredients.find((ingr) => ingr.props.type === "bun") || {};
  };
  let bun = findBun();

  const compCurrencyIcon = useMemo(() => <CurrencyIcon />, []);
  const compDragIcon = useMemo((index) => <DragIcon key={index} />, []);

  const arrIngrID = ingredients.map((ingr) => ingr.props._id);
  return (
    <section aria-label="Конструктор" className={`mt-5 ${style.section}`}>
      {ingredients.length > 0 ? (
        <>
          <ul>
            {bun.props != null ? (
              <li className={`mb-4 ${style.component}`}>
                <div style={{ visibility: "hidden" }}>
                  <DragIcon />
                </div>
                <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={`${bun.props.name} (верх)`}
                  price={bun.props.price}
                  thumbnail={bun.props.image_mobile}
                />
              </li>
            ) : null}
            {ingredients.length < 2 ? (
              <>
                <div
                  className={`${style.defaultBorder} ${style.defaultBorder_medium}`}
                >
                  <p
                    className={`text text_type_main-medium ${style.defaultText}`}
                  >
                    Теперь выберите начинку
                  </p>
                </div>
              </>
            ) : (
              <ul
                id="scrollBar"
                className={` ${style.listComponents} ${style.scrollBar}`}
              >
                {fillinFiltr().map((ingredient, index) => (
                  <>
                    <li key={index} className={`mb-4 ${style.component}`}>
                      <div>{compDragIcon}</div>
                      <ConstructorElement
                        key={index}
                        text={ingredient.props.name}
                        price={ingredient.props.price}
                        thumbnail={ingredient.props.image_mobile}
                        handleClose={() => handleRemoveIngredient(index + 1)}
                      />
                    </li>
                    {ingredients.length <= 2 ? (
                      <div
                        className={`${style.defaultBorder} ${style.defaultBorder_small}`}
                      >
                        <p
                          className={`text text_type_main-medium ${style.defaultText}`}
                        >
                          {ingredients[1].props.type === "main"
                            ? "Не забудьте соус"
                            : "А как же начинка?"}
                        </p>
                      </div>
                    ) : null}
                  </>
                ))}
              </ul>
            )}

            {bun.props != null ? (
              <li className={`${style.component}`}>
                <div style={{ visibility: "hidden" }}>
                  <DragIcon />
                </div>
                <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={`${bun.props.name} (низ)`}
                  price={bun.props.price}
                  thumbnail={bun.props.image_mobile}
                />
              </li>
            ) : null}
          </ul>
          <div className={`mt-8 mr-4 ${style.price}`}>
            <div className={`${style.price} ${style.price_icon}`}>
              <h3 className="text text_type_digits-medium">{totalPrice}</h3>
              {compCurrencyIcon}
            </div>
            <Button
              htmlType="button"
              type="primary"
              size="large"
              // onClick={toggleOrderModal}
              onClick={() => toggleOrderModal(arrIngrID)}
            >
              Оформить заказ
            </Button>
          </div>
        </>
      ) : (
        <div className={`${style.defaultBorder}`}>
          <p className={`text text_type_main-medium ${style.defaultText}`}>
            Выберите или перетащите сюда булочку
          </p>
        </div>
      )}
    </section>
  );
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.exact({ props: oneIngrPropType.isRequired })
  ),
  removeIngredient: PropTypes.func.isRequired,
  toggleOrderModal: PropTypes.func.isRequired,
};

export default BurgerConstructor;
