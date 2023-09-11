import {
  CurrencyIcon,
  Button,
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientPropType from "../../../utils/prop-types"
import PropTypes from "prop-types";
import style from "./burger-constructor.module.css";

function BurgerConstructor({
  ingredients,
  removeIngredient,
  seeAnalysis,
  orderStatus,
}) {
  BurgerConstructor.propTypes = {
    ingredients: ingredientPropType,
    removeIngredient: PropTypes.func.isRequired,
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

  const fillinFiltr = () => {
    return ingredients.filter((ingr) => ingr.props.type !== "bun") || {};
  };
  let bun = ingredients[0].props;

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
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

export default BurgerConstructor;
