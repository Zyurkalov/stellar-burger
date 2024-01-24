import { useSelector } from "react-redux";
import { useAppSelector } from "../../../utils/hooks/useAppStore";
import style from "./modal-loading.module.css";

function ModalLoading() {
  const { modalErrorStatus, errorMessage, modalLoadingStatus, loadingMessage } =
  useAppSelector((state) => state.modal);
  const message = () => (modalErrorStatus ? errorMessage : modalLoadingStatus ? loadingMessage : 'Юра, мы все просрали!') as string;
  const splitText = message().split('|* ');

  return (
    <div className={`${style.mainCont}`}>
      {splitText.map((text, index) => {
        return <p key={index} className={`mb-2 text text_type_main-medium ${style.message}`}>{text}</p>
      })}
  </div>
  );
}
export default ModalLoading;
