import { Navigate, useLocation } from "react-router-dom";
import { Authentication } from "../components/authentication/authentication";
import { ResetPasswordComponent } from "../components/authentication/reset-password/reset-password";

export function ResetPassword() {
  const location = useLocation();

  const fromForgotPassword = location.state?.from === "forgot-password";
  console.log(fromForgotPassword)
  return (
    <>
      {fromForgotPassword ? (
        <Authentication title={"Восстановление пароля"}>
          <ResetPasswordComponent />
        </Authentication>
      ) : (
        <Navigate to={"/login"} />
      )}
    </>
  );
}
