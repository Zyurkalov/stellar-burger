import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import styles from "./../modal-overlay/modal-overlay.module.css"

function ModalOverlay({children}) {

  return (
    <template className={`${styles.overlay}`} id={"template"}>
      {children}
    </template>
  );
}
export default ModalOverlay;
