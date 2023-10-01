import style from "./order-details.module.css";
import image from "../../../images/done.svg";

function OrderDetails({ number }) {
  return (
    <div className={`${style.mainCont}`}>
      {number ? (
        <>
          <h2 className="mb-6 text text_type_digits-large">{number}</h2>
          <p className="text text_type_main-medium">идентификатор заказа</p>
          <img src={image} alt="заказ принят" className="mt-15 mb-15" />
          <p className="mb-2 text text_type_main-default">
            Ваш заказ начали готовить
          </p>
          <span className="text text_type_main-default text_color_inactive">
            Дождитесь готовности на орбитальной станции
          </span>
        </>
      ) : (
        <p className="mb-2 text text_type_main-medium">
          Похоже, наш новый стажер опять решил заглянуть внутрь ксеноморф-яйца. 
          Мы работаем над проблемой. Повторите попытку позже. И не пытайтесь покинуть станцию.
        </p>
      )}
    </div>
  );
}
export default OrderDetails;
