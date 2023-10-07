import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeOrderApi } from "../../../service/actions/burger-constructor";

import {
  CurrencyIcon,
  Button,
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { deleteIngredient } from "../../../service/actions/constructor";
import { openOrderModal } from "../../../service/actions/modal";
import { ingredientPropType, oneIngrPropType } from "../../../utils/prop-types";
import PropTypes from "prop-types";
import style from "./burger-constructor.module.css";

function BurgerConstructor({
  ingredients,
  // removeIngredient,
  toggleOrderModal,
}) {
  const dispatch = useDispatch();
  const ingrList = useSelector((state) => state.ingrList.ingrList);
  // const makeOrder = useSelector((state) => state.makeOrder)

  const totalPrice = ingrList.reduce((acc, ingredient) => {
    if (ingredient.type === "bun") {
      return acc + ingredient.price * 2;
    } else {
      return acc + ingredient.price;
    }
  }, 0);

  // const totalPrice = ingredients.reduce((acc, ingredient) => {
  //   if (ingredient.props.type === "bun") {
  //     return acc + ingredient.props.price * 2;
  //   } else {
  //     return acc + ingredient.props.price;
  //   }
  // }, 0);

  // const handleRemoveIngredient = useCallback(
  //   (index) => {
  //     removeIngredient(index);
  //   },
  //   [removeIngredient]
  // );
 

  const fillinFiltr = () => {
    return ingrList.filter((ingr) => ingr.type !== "bun") || {};
  };
  const findBun = () => {
    return ingrList.find((ingr) => ingr.type === "bun") || {};
  };
  const bun = findBun();

  const compCurrencyIcon = useMemo(() => <CurrencyIcon />, []);
  const compDragIcon = useMemo((index) => <DragIcon key={index} />, []);

  const arrIngrID = ingrList.map((ingr) => ingr._id);

  const toggleModal = () => {
    dispatch(openOrderModal())
    dispatch(makeOrderApi(arrIngrID))
  }
  // const makeOrder = () => {
  //   const {orderRequest, orderFailed, orderNumber} = useSelector(state => state.makeOrder)

  //   useEffect(() => {
  //     dispatch(makeOrderApi(arrIngrID))
  //   })
  // }
  return (
    <section aria-label="Конструктор" className={`mt-5 ${style.section}`}>
      {ingrList.length > 0 ? (
        <>
          <ul>
            {bun != null ? (
              <li className={`mb-4 ${style.component}`}>
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
            ) : null}
            {ingrList.length < 2 ? (
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
                    <li className={`mb-4 ${style.component}`}>
                      <div>{compDragIcon}</div>

                      <ConstructorElement
                        key={index}
                        text={ingredient.name}
                        price={ingredient.price}
                        thumbnail={ingredient.image_mobile}
                        // handleClose={() => handleRemoveIngredient(index + 1)}
                        handleClose={() =>
                          dispatch(deleteIngredient(index + 1))
                        }
                      />
                    </li>
                    {ingrList.length <= 2 ? (
                      <div
                        className={`${style.defaultBorder} ${style.defaultBorder_small}`}
                      >
                        <p
                          className={`text text_type_main-medium ${style.defaultText}`}
                        >
                          {ingrList[1].type === "main"
                            ? "Не забудьте соус"
                            : "А как же начинка?"}
                        </p>
                      </div>
                    ) : null}
                  </>
                ))}
              </ul>
            )}

            {bun != null ? (
              <li className={`${style.component}`}>
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
              // onClick={() => toggleOrderModal(arrIngrID)
              onClick={() => toggleModal()}
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
