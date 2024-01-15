import { Authentication } from "../components/authentication/authentication";
import { RegisterComponent } from "../components/authentication/registration/registration";

export function Register() {
    return (
          <Authentication title={"Регистрация"}>
            <RegisterComponent />
          </Authentication>
      );
}