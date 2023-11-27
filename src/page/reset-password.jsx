import { Authentication } from "../components/authentication/authentication";
import { ResetPasswordComponent } from "../components/authentication/reset-password/reset-password";

export function ResetPassword() {
    return (
          <Authentication title={"Восстановление пароля"}>
            <ResetPasswordComponent />
          </Authentication>
      );
}