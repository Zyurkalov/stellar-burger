import {
  CurrencyIcon,
  Button,
  LockIcon,
  DeleteIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-constructor.module.css";

function BurgerConstructor(props) {
    
    const totalPrice = props.sendAddedIngridients.reduce(
      (acc, p) => acc + p.price,
      0
    );
  return (
    <section aria-label="Конструктор" className={`mt-5 ${style.section}`}>
      <ul>
        {props.sendAddedIngridients.map((arr) => (
          <li className={`mb-4 ${style.component}`}>
            <DragIcon />
            <div className={style.cart}>
              <img src={arr.image_mobile} className={style.image}></img>
              <h3 className={`text text_type_main-default ${style.cardName}`}>
                {arr.name}
              </h3>
              <div className={`${style.price}`}>
                <p className={"text text_type_digits-default"}>{arr.price}</p>
                <CurrencyIcon />
              </div>
              <DeleteIcon />
            </div>
          </li>
        ))}
      </ul>
      <div className={style.price}>
        <div className={`text text_type_digits-default ${style.price}`}>
          <h3>{totalPrice}</h3>
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
