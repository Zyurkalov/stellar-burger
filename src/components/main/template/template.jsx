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
  const maket = [
    { label: "Калории, ккал", value: props.calories },
    { label: "Белки, г", value: props.proteins },
    { label: "Жиры, г", value: props.fat },
    { label: "Углеводы, г", value: props.carbohydrates },
  ]

  return (
    <template className={`${styles.templ} ${checkStatus()}`}>
      <div className={`p-10 ${styles.ingrCont}`}>
        <div className={`mt-4 mb-6 ${styles.headCont}`}>
          <h2 className="text text_type_main-large">Детали ингредиента</h2>
          <div style={{cursor: "pointer"}} onClick={toggleStatus}>
          <CloseIcon type="primary"  />
          </div>
        </div>
        <section className={styles.section}>
          <img
            src={props.image_large}
            className={styles.img}
            alt={props.name}
          />
          <div>
            <h3 className={`mb-8 text text_type_main-medium ${styles.name}`}>{props.name}</h3>
            <ul className={styles.ingrList}>
            {maket.map((item, index) => (
              <li className={styles.ingrInfo} key={index}>
                <p className="text text_type_main-default text_color_inactive">
                  {item.label}
                </p>
                <span className={`text text_type_digits-default text_color_inactive ${styles.span}`}>
                  {item.value}
                </span>
              </li>
            ))}
            </ul>
          </div>
        </section>
      </div>
    </template>
  );
}
export default Template;
