import { Authentication } from "../components/authentication/authentication";
import { ForgotPassworComponent } from "../components/authentication/forgot-password/forgot-password";

export function ForgotPassword() {
    return (
        <>
          <Authentication title={"Восстановление пароля"}>
            <ForgotPassworComponent />
          </Authentication>
        </>
      );
}