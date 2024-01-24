import ReactDOM from "react-dom";
import { useEffect, FC, SyntheticEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/useAppStore";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { closeModal } from "../../service/actions/modal";
import ModalOverlay from "./modal-overlay/modal-overlay";

import styles from "./modal.module.css";
import PropTypes from "prop-types";

const Modal: FC<{title?: string | null, styleTitle?: string, children?: React.ReactNode, onClose?: () => void}> = ({ title, styleTitle, children, onClose }) => {
  const { modalLoadingStatus, modalErrorStatus } = useAppSelector((state) => state.modal);
  const portal = document.getElementById("portal") as HTMLElement;
  const dispatch = useAppDispatch();

  let styleFonts = '' 
  switch (styleTitle) {
    case 'large': 
      styleFonts = `text_type_main-large`
      break;
    default:
      styleFonts = `mb-6 text_type_digits-default`
  }

  const close = () => {
    if(onClose) {
      onClose()
    }else{
      dispatch(closeModal())
    }
  };
  useEffect(() => {
    const handleCloseModal = (event: KeyboardEvent | MouseEvent) => {
      if ((event instanceof KeyboardEvent && event.key === "Escape") || 
      (event instanceof MouseEvent && event.target instanceof HTMLDivElement && event.target.id === "template")) {
        close()
      }
      // if ((event.key === "Escape") || (event.target.id === "template")) {
      //   close()
      // }
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
              <h2 className={`text ${styleFonts}`}>{title || null}</h2>
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

// Modal.propTypes = {
//   title: PropTypes.string,
//   children: PropTypes.node.isRequired,
//   onClose: PropTypes.func,
//   styleTitle: PropTypes.string,
// };

export default Modal;
