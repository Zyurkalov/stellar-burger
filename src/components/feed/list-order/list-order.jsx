
import { useSelector } from "react-redux";
import { IngredientsOrderDetails } from "./ingredients-order-details/ingredients-order-details";
import style from "./list-order.module.css";

export default function ListOrder() {
  
  // const {
  //   dataList: { data },
  // } = useSelector((store) => store);

  return (
    <ul className={style.mainContainer}>
      <li className={style.container}>
        <div className={style.flexContainer}>
          <span className="text text_type_digits-default">#034535</span>
          <span className={`text text_type_main-small ${style.data}`}>
            Сегодня, 16:20 i-GMT+3
          </span>
        </div>
        <div>
          <h2 className={`text text_type_main-medium ${style.header}`}>
            Death Star Starship Main бургер
          </h2>
          <p className={`text text_type_main-small`}>Готовится</p>
        </div>
        <IngredientsOrderDetails />
      </li>
    </ul>
  );
}
