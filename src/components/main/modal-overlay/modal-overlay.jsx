import React, { useEffect } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from "./order-details/order-details"
import styles from "./modal-overlay.module.css";

function ModalOverlay()  {
    const [status, setStatus] = React.useState(true);
    const toggleStatus = () => {setStatus(!status)};

    const checkStatus = () => {
        return status === false ? styles.disabled : styles.visible;
      };

    return (
        <template className={`${styles.templ} ${checkStatus()}`}>
      <div className={`p-10 ${styles.ingrCont}`}>
        
        <div className={`mt-4 mb-6 ${styles.headCont}`}>
          <h2 className="text text_type_main-large"></h2>
          <div style={{cursor: "pointer"}} onClick={toggleStatus}>
          <CloseIcon type="primary"  />
          </div>
        </div>
        <OrderDetails />
        
      </div>
    </template>
    )
}

export default ModalOverlay