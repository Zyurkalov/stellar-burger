import {
  CurrencyIcon,
  Button,
  LockIcon,
  DeleteIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-constructor.module.css";

function BurgerConstructor({ ingredients, removeIngredient, seeAnalysis}) {
  const totalPrice = ingredients.reduce((acc, ingredient) => acc + ingredient.props.price, 0);
  const handleRemoveIngredient = (index) => {
    removeIngredient(index);
  };

  return (
    <section aria-label="Конструктор" className={`mt-5 ${style.section}`}>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index} className={`mb-4 ${style.component}`} onClick={() => seeAnalysis(ingredient.props)}>
            <DragIcon />
            <div className={style.cart} >
              <img src={ingredient.props.image_mobile} className={style.image} alt={ingredient.props.name} />
              <h3 className={`text text_type_main-default ${style.cardName}`}>
                {ingredient.props.name}
              </h3>
              <div className={`${style.price}`}>
                <p className={"text text_type_digits-default"}>{ingredient.props.price}</p>
                <CurrencyIcon />
              </div>
              <DeleteIcon onClick={() => handleRemoveIngredient(index)} />
            </div>
          </li>
        ))}
      </ul>
      <div className={`mt-8 ${style.price}`}>
        <div className={`${style.price} ${style.price_icon}`}>
          <h3 className="text text_type_digits-medium">{totalPrice}</h3>
          <CurrencyIcon />
        </div>
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

export default BurgerConstructor;
