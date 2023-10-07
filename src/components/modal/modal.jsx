import ReactDOM from "react-dom";
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { closeModal } from "../../service/actions/modal";

import ModalOverlay from "./modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./modal.module.css";

function Modal({ primaryModal, title, children }) {
  const portal = document.getElementById("portal");
  const dispatch = useDispatch()

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        dispatch(closeModal())
        // primaryModal();
      }
    };
    const hadleOutsideClick = (event) => {
      if (event.target.id === "template") {
        dispatch(closeModal())
        // primaryModal();
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
    <ModalOverlay>
      <div className={`p-10 ${styles.ingrCont}`}>
        <div className={`mt-4 mb-6 ${styles.headCont}`}>
          <h2 className="text text_type_main-large">{title || null}</h2>
          <div className={styles.cursorPointer}>
            <CloseIcon type="primary" onClick={primaryModal} />
          </div>
        </div>
        {children}
      </div>
    </ModalOverlay>,
    portal
  );
}
Modal.propTypes = {
  primaryModal: PropTypes.func.isRequired,
  title: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.string]).isRequired,
  children: PropTypes.node.isRequired
};

export default Modal;
