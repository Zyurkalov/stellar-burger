import ReactDOM from "react-dom";
import React, { useEffect } from "react";
import PropTypes from "prop-types";

import {ingredientPropType} from "../../../utils/prop-types";
import OrderDetails from "./order-details/order-details";
import ModalOverlay from "./modal-overlay/modal-overlay";
import IngredientDetails from "./ingredient-details/ingredient-details";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./modal.module.css";

function Modal({ opener, analysis, primaryStatus, title, children }) {
  const portal = document.getElementById("portal");

  Modal.propTypes = {
    opener: PropTypes.bool,
    orderStatus: PropTypes.bool,
    analysis: ingredientPropType,
    primaryStatus: PropTypes.func,
  };

  const checkStatus = () => (opener ? styles.visible : styles.disabled);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        primaryStatus();
      }
    };
    const hadleOutsideClick = (event) => {
      if (event.target.id === "template") {
        primaryStatus();
      }
    };
    window.addEventListener("keydown", handleEscKey);
    window.addEventListener("click", hadleOutsideClick);
    return () => {
      window.removeEventListener("keydown", handleEscKey);
      window.removeEventListener("click", hadleOutsideClick);
    };
  }, []);

  return ReactDOM.createPortal(
    // <template className={`${styles.templ} ${checkStatus()}`} id={"template"}>
    //   <div className={`p-10 ${styles.ingrCont}`}>
    //     <div className={`mt-4 mb-6 ${styles.headCont}`}>
    //     <h2 className="text text_type_main-large">
    //       {"Детали ингредиента"}
    //     </h2>
    //     <div style={{ cursor: "pointer" }}>
    //       <CloseIcon type="primary" onClick={primaryStatus} />
    //     </div>
    //     </div>
    //     {/* {orderStatus ? (
    //       <OrderDetails />
    //     ) : (
    //       <IngredientDetails analysis={analysis} />
    //     )} */}
    //   </div>
    // </template>,
    <ModalOverlay >
      <div className={`p-10 ${styles.ingrCont}`}>
        <div className={`mt-4 mb-6 ${styles.headCont}`}>
          <h2 className="text text_type_main-large">
            {title || null}
          </h2>
          <div style={{ cursor: "pointer" }}>
            <CloseIcon type="primary" onClick={primaryStatus} />
          </div>
        </div>
        {children}
      </div>
      </ModalOverlay>,
    portal
  );
}
Modal.propTypes = {
  opener: PropTypes.bool,
  orderStatus: PropTypes.bool,
  analysis: ingredientPropType,
  primaryStatus: PropTypes.func,
};

export default Modal;
