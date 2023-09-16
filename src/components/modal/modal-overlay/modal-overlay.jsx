import PropTypes from "prop-types";
import styles from "./../modal-overlay/modal-overlay.module.css"

function ModalOverlay({children}) {

  return (
    <template className={`${styles.overlay}`} id={"template"}>
      {children}
    </template>
  );
}
ModalOverlay.propTypes = {
  children: PropTypes.node.isRequired,
};
export default ModalOverlay;
