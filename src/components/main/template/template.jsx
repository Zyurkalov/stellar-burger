import React, { useEffect } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./template.module.css";

function Template({ analysis }) {
  const [status, setStatus] = React.useState(false);
  const toggleStatus = () => {
    setStatus(!status);
  };
  const checkStatus = () => {
    return status === false ? styles.disabled : styles.visible;
  };
  //useEffect - метод React
  useEffect(() => {
    if (analysis && analysis.length > 0) {
      toggleStatus();
    }
  }, [analysis]);

  //значение props до получения объекта
  let props = {};
  if (analysis && analysis.length > 0) {
    [props] = analysis;
  }

  return (
    <template className={`${styles.templ} ${checkStatus()}`}>
      <div className={`p-10 ${styles.ingrCont}`}>
        <div className={`mt-4 mb-6 ${styles.headCont}`}>
          <h2 className="text text_type_main-large">Детали ингредиента</h2>
          <CloseIcon type="primary" onClick={toggleStatus} />
        </div>
        <section className={styles.section}>
          <img
            src={props.image_large}
            className={styles.img}
            alt={props.name}
          />
          <div>
            <h3 className="mb-8 text text_type_main-medium">{props.name}</h3>
            <ul className={styles.ingrList}>
              <li className={styles.ingrInfo}>
                <p className="text text_type_main-default text_color_inactive">
                  Калории,ккал
                </p>
                <span className={`text text_type_digits-default text_color_inactive ${styles.span}`}>
                  {props.calories}
                </span>
              </li>
              <li className={styles.ingrInfo}>
                <p className="text text_type_main-default text_color_inactive">
                  Белки, г
                </p>
                <span className={`text text_type_digits-default text_color_inactive ${styles.span}`}>
                  {props.proteins}
                </span>
              </li>
              <li className={styles.ingrInfo}>
                <p className="text text_type_main-default text_color_inactive">
                Жиры, г
                </p>
                <span className={`text text_type_digits-default text_color_inactive ${styles.span}`}>
                {props.fat}
                </span>
              </li>
              <li className={styles.ingrInfo}>
                <p className="text text_type_main-default text_color_inactive">
                 Углеводы, г
                </p>
                <span className={`text text_type_digits-default text_color_inactive ${styles.span}`}>
                {props.carbohydrates}
                </span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </template>
  );
}
export default Template;
