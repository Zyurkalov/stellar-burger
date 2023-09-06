import React from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./template.module.css"

function Template() {
    

    const seeAnalysis = (ingredient) => {};

    return (
        <template className={`${styles.templ} ${styles.disabled}`}>
            <div className={`p-10 ${styles.ingrCont}`}>
                <div className={styles.headCont}>
                    <h2 className="text text_type_main-large">Детали ингредиента</h2>
                    <CloseIcon type="primary"/>
                </div>
                <section className={styles.section}>
                <img scr='' className={styles.img}></img>
                <div>
                    <h3 className="mb-8 text text_type_main-medium">Имя</h3>
                    <ul className={styles.ingrList}> 
                        <li className={styles.ingrInfo}>
                            <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
                            <span className="text text_type_main-default text_color_inactive">244,4</span>
                        </li>
                    </ul>
                </div>
                </section>
            </div>
        </template>
    )
}
export default Template