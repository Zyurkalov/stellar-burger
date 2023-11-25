import { Authentication } from "../components/authentication/authentication";
import { LoginComponent } from "../components/authentication/login/login";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { Navigate } from "react-router-dom";

export function Login() {

  return (
    <>
      <Authentication title={"Вход"}>
        <LoginComponent />
      </Authentication>
    </>
  );
}
