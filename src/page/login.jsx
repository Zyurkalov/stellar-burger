import { Navigate, useLocation } from "react-router-dom";
import { Authentication } from "../components/authentication/authentication";
import { LoginComponent } from "../components/authentication/login/login";
import { useCookie } from "../utils/useCookie";

export function Login() {
  const { getCookie } = useCookie;
  const location = useLocation()
  const accessToken = getCookie("accessToken");
  const from = location?.state?.from

  return accessToken ? (
    <Navigate to={from || "/"} replace />
  ) : (
    <Authentication title={"Вход"}>
      <LoginComponent />
    </Authentication>
  );
}
