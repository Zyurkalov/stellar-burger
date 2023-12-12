import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDrop } from "react-dnd";

import {CurrencyIcon, Button, DragIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { addIngredient } from "../../../service/actions/constructor";
import { makeOrderApi } from "../../../service/actions/burger-constructor";
import { ConstructorCart } from "./constructor-cart/constructor-cart";
import { openOrderModal } from "../../../service/actions/modal";
import { oneIngrPropType } from "../../../utils/prop-types";
import { useCookie } from "../../../utils/useCookie";

import PropTypes from "prop-types";
import style from "./burger-constructor.module.css";

function BurgerConstructor() {
  // const ref = useRef(null);
  const refIngrList = useRef(null)
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const bunList = useSelector((state) => state.ingrList.bun);
  const otherList = useSelector((state) => state.ingrList.other);
  const bun = bunList && bunList.length > 0 ? bunList[0] : null;

  const orderStatus = useSelector((state) => state.makeOrder.orderSuccess)
  const { getCookie } = useCookie
  const refreshToken = getCookie("refreshToken")

  const totalPrice = (otherList && otherList.length > 0)
  ? otherList.reduce((acc, ingredient) => acc + ingredient.price, 0) + (bun ? bun.price * 2 : 0)
  : (bun ? bun.price * 2 : 0);
  
  const arrIngrID = () => {
    if(bun) {
      return [bun, ...otherList, bun].map((ingr) => ingr._id)
    } else {return []}
  }
const [{ isHover }, dropTarget] = useDrop({
    accept: ["ingredient"],
    drop(ingr) {
      dispatch(addIngredient(ingr));
    },
  });
  const toggleModal = () => {
    if (refreshToken) {
      dispatch(openOrderModal());
      dispatch(makeOrderApi(arrIngrID()));
    } else {
      navigate("/login");
    }
  };

  const burger = (pos) => 
    {return (bun != null ? (
      <li className={`mb-4 ${style.component}`}>
        <div style={{ visibility: "hidden" }}>
          <DragIcon />
        </div>
        <ConstructorElement
          type={pos === 'top' ? "top" : "bottom"}
          isLocked={true}
          text={`${bun.name} ${pos === 'top' ? "(верх)" : "(низ)"}`}
          price={bun.price}
          thumbnail={bun.image_mobile}
        />
      </li>
    ) : (
        <div
          className={`${style.defaultBorder} ${style.defaultBorder__bun} ${pos === 'top' 
          ? style.defaultBorder__bun_top 
          : style.defaultBorder__bun_bottom}`}>
          <p className={`text text_type_main-medium ${style.defaultText}`}>
            Выберите булочку
          </p>
        </div>
    ))}
  

  return (
    <section
      aria-label="Конструктор"
      className={`mt-5 ${style.section}`}
      ref={(node) => {
        dropTarget(node);
      }}
      
    >
      {otherList.length || (bun != null) ? (
        <>
          <ul >
          {burger('top')}
            {otherList.length === 0 ? (
                <div className={`${style.defaultBorder} ${style.defaultBorder_medium}`}>
                  <p className={`text text_type_main-medium ${style.defaultText}`}>
                    Выберите начинку
                  </p>
                </div>
            ) : (
              <ul
                id="scrollBar"
                className={` ${style.listComponents} ${style.scrollBar}`}
                ref={refIngrList}
              >
                {otherList.map((ingredient, index) => (
                  <React.Fragment key={ingredient.uniqueId}>
                    <ConstructorCart ingredient={ingredient} index={index}/>
                    {otherList.length <= 1 ? (
                      <div className={`${style.defaultBorder} ${style.defaultBorder_small}`} >
                        {/* <p className={`text text_type_main-medium ${style.defaultText}`}>
                          {otherList[0].type === "main"
                            ? "Не забудьте соус"
                            : "А как же начинка?"}
                        </p> */}
                      </div>
                    ) : null}
                  </React.Fragment>
                ))}
              </ul>
            )}
            {burger('bottom')}

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
              extraClass={otherList.length >= 2 && (bun != null) ? style.active : style.disabled}
              onClick={() => toggleModal()}
            >
              Оформить заказ
            </Button>
          </div>
        </>
      ) : (
        <div className={`${style.defaultBorder}`}>
         { orderStatus ? (<p className={`text text_type_main-medium ${style.defaultText}`}>
            Благодарим за заказ! 
            Состояние заказа можно посмотреть в разделе «Лента заказов».
          </p>
          ) : (<p className={`text text_type_main-medium ${style.defaultText}`}>
            Выберите и перетащите сюда булочку
          </p>)}
          
        </div>
      )}
    </section>
  );
}

BurgerConstructor.propTypes = {
  ingrList: PropTypes.arrayOf(PropTypes.exact(oneIngrPropType.isRequired)),
};

export default BurgerConstructor;
