import ReactDOM from "react-dom";
import { useEffect } from "react";
// import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { closeModal } from "../../service/actions/modal";
import ModalOverlay from "./modal-overlay/modal-overlay";

import styles from "./modal.module.css";
import PropTypes from "prop-types";

function Modal({ title, from, children, onClose }) {
  const { modalLoadingStatus, modalErrorStatus } = useSelector((state) => state.modal);
  const portal = document.getElementById("portal");
  const dispatch = useDispatch();
  // const location = useLocation();
  // const background = location.state && location.state.background;

  const close = () => {
    if(onClose) {
      onClose()
    }else{
      dispatch(closeModal())
    }
  };
  useEffect(() => {
    const handleCloseModal = (event) => {
      if ((event.key === "Escape") || (event.target.id === "template")) {
        close()
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
      <div className={`p-10 ${styles.ingrCont} ${modalLoadingStatus || modalErrorStatus ? styles.ingrCont_background : null}`}>
        <div className={`mt-4 mb-6 ${styles.headCont}`}>
          <h2 className="text text_type_main-large">{title || null}</h2>
          <div className={styles.cursorPointer}>
            {!modalLoadingStatus ? <CloseIcon type="primary" onClick={() => close()} /> : null}
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
  // from: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func
};

export default Modal;
