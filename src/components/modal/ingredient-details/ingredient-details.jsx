import {ingredientPropType} from "../../../utils/prop-types";
import styles from "./ingredient-details.module.css";

function IngredientDetails({ analysis }) {
  
  if (analysis && analysis.length > 0) {
    [analysis] = analysis;
  }

  const maket = [
    { label: "Калории, ккал", value: analysis.calories },
    { label: "Белки, г", value: analysis.proteins },
    { label: "Жиры, г", value: analysis.fat },
    { label: "Углеводы, г", value: analysis.carbohydrates },
  ];

  return (
    <section className={styles.section}>
      <img
        src={analysis.image_large}
        className={styles.img}
        alt={analysis.name}
      />
      <div>
        <h3 className={`mb-8 text text_type_main-medium ${styles.name}`}>
          {analysis.name}
        </h3>
        <ul className={styles.ingrList}>
          {maket.map((item, index) => (
            <li className={`mb-5 ${styles.ingrInfo}`} key={index}>
              <p className="text text_type_main-default text_color_inactive">
                {item.label}
              </p>
              <span
                className={`text text_type_digits-default text_color_inactive ${styles.span}`}
              >
                {item.value}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
IngredientDetails.propTypes = {
  analysis: ingredientPropType,
};
export default IngredientDetails;
