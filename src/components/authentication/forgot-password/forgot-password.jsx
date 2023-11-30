import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { useInput } from "../../../utils/hooks/use-Input";
import { useFormAndValidation } from "../../../utils/hooks/useFormAndValidation";
import { forgotPassword } from "../../../service/actions/user-auth";
import style from "./forgot-password.module.css";

export function ForgotPassworComponent() {
  // const {input, setInput, changedInput, active, modifiedInput} = useInput({email: "",});
  const {values, handleChange, handleValid,setIsValid, isValid} = useFormAndValidation({email: "",})
  const status = isValid && values.email
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = (e) => {
    // modifiedInput(e);
    handleChange(e)
    handleValid()
  };

  const sendEmail = (e) => {
    e.preventDefault();
    if (values.email) {
      dispatch(forgotPassword(values))
        .then((data) => {
          if (data.success) {
            setIsValid(false);
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
    <form className={style.container} onSubmit={sendEmail}>
      <fieldset className={style.inputContainer}>
        <EmailInput
          onChange={onChange}
          value={values.email}
          name={"email"}
          placeholder="Укажите e-mail"
          isIcon={false}
        />
      </fieldset>
      <Button
        htmlType="submit" 
        type="primary"
        size="medium"
        extraClass={status ? style.active : style.disabled}
      >
        Восстановить
      </Button>
    </form>
  );
}
