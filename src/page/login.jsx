import { Navigate } from "react-router-dom";
import { Authentication } from "../components/authentication/authentication";
import { LoginComponent } from "../components/authentication/login/login";
import { useCookie } from "../utils/useCookie";

export function Login() {
  const { getCookie } = useCookie;
  const accessToken = getCookie("accessToken");

  return accessToken ? (
    <Navigate to="/" replace />
  ) : (
    <Authentication title={"Вход"}>
      <LoginComponent />
    </Authentication>
  );
}
