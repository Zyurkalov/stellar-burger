import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useInput } from "../../../utils/use-Input";
import { forgotPassword } from "../../../service/actions/user-auth";
import style from "./forgot-password.module.css";

export function ForgotPassworComponent() {
  const [input, setInput, changedInput, active, modifiedInput] = useInput({
    email: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = (e) => {
    modifiedInput(e);
  };
  const sendEmail = (input) => {
    if (input.email) {
      dispatch(forgotPassword(input))
        .then((data) => {
          if (data.success) {
            changedInput(false);
            navigate("/reset-password");
          } else {
            console.error(data.error);
          }
        })
        .catch((error) => {
          console.error(error); 
        });
    }
  };
  return (
    <div className={style.container}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <EmailInput
          onChange={onChange}
          value={input.email}
          name={"email"}
          placeholder="Укажите e-mail"
          isIcon={false}
        />
      </div>
      <Button
        htmlType="button"
        type="primary"
        size="medium"
        onClick={() => sendEmail(input)}
        extraClass={active ? style.active : style.disabled}
      >
        Восстановить
      </Button>
    </div>
  );
}
