
import {FC} from "react"
import styles from "./../modal-overlay/modal-overlay.module.css"

const ModalOverlay: FC<{children: React.ReactNode}> = ({children}) => {

  return (
    <template className={`${styles.overlay}`} id={"template"}>
      {children}
    </template>
  );
}
export default ModalOverlay;
