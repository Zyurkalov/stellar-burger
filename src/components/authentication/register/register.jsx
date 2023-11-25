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
import { useInput } from "../../../utils/use-Input";

export function RegisterComponent() {
  const [input, setInput, changedInput, active, modifiedInput] = useInput({email: "", password: "", name: "" });
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(registration(input));
      if (localStorage.getItem("accessToken")) {
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const registrNewUser = (form) => {
  //   dispatch(registration(form))
  //     .then((data) => {
  //       if (data && data.success) {
  //         navigate('/login');
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  const onChange = (e) => {
    modifiedInput(e)
  };
  // function checkInput(e) {
  //   e.predDefailtEvent
  //   const test = inputRef.current.querySelector('.input__error ') || null
  //   console.log(test)
  // }
  return (
    <form className={style.container} onSubmit={handleSubmit}>
      <div className={style.inputContiner}> 
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={onChange}
        value={input.name}
        name={"name"}
      />
      </div>
      <div className={style.inputContiner}>  
      <EmailInput
        onChange={onChange}
        value={input.email}
        name={"email"}
        
      />
      </div>
      <div className={style.inputContiner}> 
      <PasswordInput
        onChange={onChange}
        value={input.password}
        name={"password"}
        // extraClass="mb-2"
      />
      </div>
      <Button 
        htmlType="submit" 
        type="primary" 
        size="medium" 
        extraClass={active ? style.active : style.disabled}>
        Зарегистрироваться
      </Button>
    </form>
  );
}
