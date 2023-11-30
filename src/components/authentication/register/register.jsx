import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { registration } from "../../../service/actions/user-auth";
import { useDispatch } from "react-redux";
import style from "./register.module.css";
import { useNavigate } from "react-router-dom";
// import { useInput } from "../../../utils/hooks/use-Input";
import { useFormAndValidation } from "../../../utils/hooks/useFormAndValidation";

export function RegisterComponent() {
  // const {input, setInput, changedInput, active, modifiedInput} = useInput({email: "", password: "", name: "" });
  const { values, handleChange, handleValid, isValid} = useFormAndValidation({email: "", password: "", name: "" })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const status = isValid && values.email && values.password && values.name

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(registration(values));
      if (localStorage.getItem("accessToken")) {
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
    }
  };
  const onChange = (e) => {
    // modifiedInput(e)
    handleChange(e)
    handleValid()
  };

  return (
    <form className={style.container} onSubmit={handleSubmit}>
      <fieldset className={style.inputContiner}> 
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={onChange}
        value={values.name}
        name={"name"}
      />
      </fieldset>
      <fieldset className={style.inputContiner}>  
      <EmailInput
        onChange={onChange}
        value={values.email}
        name={"email"}
        
      />
      </fieldset>
      <fieldset className={style.inputContiner}> 
      <PasswordInput
        onChange={onChange}
        value={values.password}
        name={"password"}
        // extraClass="mb-2"
      />
      </fieldset>
      <Button 
        htmlType="submit" 
        type="primary" 
        size="medium" 
        extraClass={status ? style.active : style.disabled}>
        Зарегистрироваться
      </Button>
    </form>
  );
}
