import ReactDOM from "react-dom";
import React, { useEffect } from "react";
import PropTypes from "prop-types";

import ingredientPropType from "../../../utils/prop-types";
import OrderDetails from "./order-details/order-details";
import Modal from "./modal/modal";
import IngredientDetails from "./ingredient-details/ingredient-details";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./modal-overlay.module.css";

function ModalOverlay({ status, orderStatus, analysis, removeStatus }) {
  const portal = document.getElementById("portal");

  ModalOverlay.propTypes = {
    status: PropTypes.bool,
    orderStatus: PropTypes.bool,
    analysis: ingredientPropType,
    removeStatus: PropTypes.func,
  };

  const checkStatus = () => (status ? styles.visible : styles.disabled);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        removeStatus();
      }
    };
    const hadleOutsideClick = (event) => {
      if (event.target.id === "template") {
        removeStatus();
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
    <template className={`${styles.templ} ${checkStatus()}`} id={"template"}>
      <div className={`p-10 ${styles.ingrCont}`}>
        <div className={`mt-4 mb-6 ${styles.headCont}`}>
          <Modal orderStatus={orderStatus} removeStatus={removeStatus} />
        </div>
        {orderStatus ? (
          <OrderDetails />
        ) : (
          <IngredientDetails analysis={analysis} />
        )}
      </div>
    </template>,
    portal
  );
}

export default ModalOverlay;
