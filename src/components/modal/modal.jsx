import ReactDOM from "react-dom";
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { closeModal } from "../../service/actions/modal";

import ModalOverlay from "./modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./modal.module.css";

function Modal({ title, children }) {
  const portal = document.getElementById("portal");
  const dispatch = useDispatch();
  console.log(title)

  useEffect(() => {
    const handleCloseModal = (event) => {
      if ((event.key === "Escape") || (event.target.id === "template")) {
        dispatch(closeModal());
      }
    };
    window.addEventListener("keydown", handleCloseModal);
    window.addEventListener("click", handleCloseModal);
    return () => {
      window.removeEventListener("keydown", handleCloseModal);
      window.removeEventListener("click", handleCloseModal);
    };
  }, []);

  return ReactDOM.createPortal(
    <ModalOverlay>
      <div className={`p-10 ${styles.ingrCont}`}>
        <div className={`mt-4 mb-6 ${styles.headCont}`}>
          <h2 className="text text_type_main-large">{title || null}</h2>
          <div className={styles.cursorPointer}>
            <CloseIcon type="primary" onClick={() => dispatch(closeModal())} />
          </div>
        </div>
        {children}
      </div>
    </ModalOverlay>,
    portal
  );
}
Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Modal;
