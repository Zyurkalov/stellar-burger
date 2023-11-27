import { Authentication } from "../components/authentication/authentication";
import { RegisterComponent } from "../components/authentication/register/register";

export function Register() {
    return (
          <Authentication title={"Регистрация"}>
            <RegisterComponent />
          </Authentication>
      );
}