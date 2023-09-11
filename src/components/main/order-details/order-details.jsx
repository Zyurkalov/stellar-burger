import React from "react"
import styles from "./order-details.module.css"
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import image from "../../../images/done.svg"

function OrderDetails({orderStatus, toggleStatus}) {
    const checkStatus = () => {
        return orderStatus === false ? styles.disabled : styles.visible;
    }
    return (
        <template className={`${styles.templ} ${checkStatus()}`}>
            <div className={`p-10 ${styles.ingrCont}`}>
                <div className={`mt-4 mb-4 ${styles.headCont}`}>
                    <h3 className="text text_type_main-large"></h3>
                    <CloseIcon type="primary" onClick={toggleStatus}/>
                </div>
                <div className={`${styles.mainCont}`}>
                    <h2 className="mb-6 text text_type_digits-large">024680</h2>
                    <p className="text text_type_main-medium">идентификатор заказа</p>
                    <img src={image} alt="image" className="mt-15 mb-15"/>
                    <p className="mb-2 text text_type_main-default">Ваш заказ начали готовить</p>
                    <span className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</span>
                </div>
            </div>
        </template>
    )
}
export default OrderDetails;