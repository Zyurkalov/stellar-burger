import PropTypes from "prop-types";
import {FC} from "react"
import styles from "./../modal-overlay/modal-overlay.module.css"

const ModalOverlay: FC<{children: React.ReactNode}> = ({children}) => {

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
