import { Authentication } from "../components/authentication/authentication";
import { ForgotPassworComponent } from "../components/authentication/forgot-password/forgot-password";

import { useLocation, Navigate } from "react-router-dom";

export function ForgotPassword() {
  const location = useLocation();
  const fromLogin = location.state?.from === "login";

  return fromLogin ? (
    <Authentication title={"Восстановление пароля"}>
      <ForgotPassworComponent />
    </Authentication>
  ) : (
    <Navigate to={"/login"} />
  );
}
