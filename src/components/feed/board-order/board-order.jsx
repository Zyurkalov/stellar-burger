import style from "./board-order.module.css"

export default function BoardOrder() {
    return (
        <div className={style.mainContainer}>
            <ul className={style.orderStatus}>
                <li className={style.orderStatus__container}>
                    <h2 className={`text text_type_main-medium ${style.orderStatus__header}`}>Готовы:</h2>
                    <ul className={style.orderStatus__list}>
                        <li className={`text text_type_digits-default ${style.orderStatus_done}`}>034533</li>
                        <li className={`text text_type_digits-default ${style.orderStatus_done}`}>034533</li>
                        <li className={`text text_type_digits-default ${style.orderStatus_done}`}>034533</li>
                    </ul>
                </li>
                <li className={style.orderStatus__container}>
                    <h2 className={`text text_type_main-medium ${style.orderStatus__header}`}>В работе:</h2>
                    <ul className={style.orderStatus__list}>
                        <li className={"text text_type_digits-default"}>034533</li>
                        <li className={"text text_type_digits-default"}>034533</li>
                        <li className={"text text_type_digits-default"}>034533</li>
                    </ul>
                </li>
            </ul>
            <div className={style.completedOrder}>
                <h2 className={`text text_type_main-medium ${style.orderStatus__header}`}> Выполнено за все время:</h2>
                <span className="text text_type_digits-large">28 752</span>
            </div>
            <div className={style.completedOrder}>
                <h2 className={`text text_type_main-medium ${style.orderStatus__header}`}>Выполнено за сегодня:</h2>
                <span className="text text_type_digits-large">138</span>
            </div>
        </div>
      );
}