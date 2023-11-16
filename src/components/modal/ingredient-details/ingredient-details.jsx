import { useSelector } from "react-redux";
import {ingredientPropType} from "../../../utils/prop-types";
import styles from "./ingredient-details.module.css";

function IngredientDetails(ingr) {
  // ингредиент можно передать через пропс, либо через диспатч стора 
  const {compIngr} = useSelector((store) => store.modal)
  const {item, title} = ingr

  const maket = [
    { label: "Калории, ккал", value: compIngr.calories || item.calories },
    { label: "Белки, г", value: compIngr.proteins || item.proteins },
    { label: "Жиры, г", value: compIngr.fat || item.fat },
    { label: "Углеводы, г", value: compIngr.carbohydrates || item.carbohydrates },
  ];

  return (
    <section className={styles.section}>

      <img
        src={compIngr.image_large || item.image_large}
        className={styles.img}
        alt={compIngr.name || item.name}
      />
      <div>
        <h3 className={`mb-8 text text_type_main-medium ${styles.name}`}>
          {compIngr.name || item.name}
        </h3>
        <ul className={styles.ingrList}>
          {maket.map((point, index) => (
            <li className={`mb-5 ${styles.ingrInfo}`} key={index}>
              <p className="text text_type_main-default text_color_inactive">
                {point.label}
              </p>
              <span
                className={`text text_type_digits-default text_color_inactive ${styles.span}`}
              >
                {point.value}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
// IngredientDetails.propTypes = {
//   compIngr: ingredientPropType,
// };
export default IngredientDetails;
