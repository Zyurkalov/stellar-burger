import { Navigate, useLocation } from "react-router-dom";
import { Authentication } from "../components/authentication/authentication";
import { ResetPasswordComponent } from "../components/authentication/reset-password/reset-password";

export function ResetPassword() {
  const location = useLocation();
  // const from = location.state?.from || '/';
  const fromForgotPassword = location.state?.from === 'forgot-password'
  return (
    <>
      {!fromForgotPassword ? (
        <Navigate to={'/'} />
      ) : (
        <Authentication title={"Восстановление пароля"}>
          <ResetPasswordComponent />
        </Authentication>
      )}
    </>
  );
}