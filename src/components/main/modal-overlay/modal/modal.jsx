import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

function Modal({ orderStatus, removeStatus }) {
  Modal.propTypes = {
    orderStatus: PropTypes.bool,
    removeStatus: PropTypes.func,
  };

  return (
    <>
      <h2 className="text text_type_main-large">
        {!orderStatus ? "Детали ингредиента" : null}
      </h2>
      <div style={{ cursor: "pointer" }}>
        <CloseIcon type="primary" onClick={removeStatus} />
      </div>
    </>
  );
}

export default Modal;
