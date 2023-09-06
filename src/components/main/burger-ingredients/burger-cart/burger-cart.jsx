
import style from './burger-cart.module.css'
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'

function BurgerCart(props) {
  const addIngredient = () => {
    props.addIngr({props});
  };

  return (
    <div className={style.cart} key={props._id} onClick={addIngredient}>
      <img src={props.image} alt={props.name} />
      <div className={style.cartPrice}>
        <p className="mt-2 text text_type_digits-default">{props.price}</p>
        <CurrencyIcon />
      </div>
      <h3 className={`mt-3 text text_type_main-small ${style.cartName}`}>{props.name}</h3>
    </div>
  );
}
  
  export default BurgerCart;