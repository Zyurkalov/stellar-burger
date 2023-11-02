import { Authentication } from "../components/authentication/authentication";
import { LoginComponent } from "../components/authentication/login/login";

export function Login() {
  return (
    <>
      <Authentication title={"Вход"}>
        <LoginComponent />
      </Authentication>
    </>
  );
}
