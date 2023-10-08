import { useSelector } from "react-redux";
import {ingredientPropType} from "../../../utils/prop-types";
import styles from "./ingredient-details.module.css";

function IngredientDetails() {
  const {compIngr} = useSelector((store) => store.modal)

  const maket = [
    { label: "Калории, ккал", value: compIngr.calories },
    { label: "Белки, г", value: compIngr.proteins },
    { label: "Жиры, г", value: compIngr.fat },
    { label: "Углеводы, г", value: compIngr.carbohydrates },
  ];

  return (
    <section className={styles.section}>
      <img
        src={compIngr.image_large}
        className={styles.img}
        alt={compIngr.name}
      />
      <div>
        <h3 className={`mb-8 text text_type_main-medium ${styles.name}`}>
          {compIngr.name}
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
