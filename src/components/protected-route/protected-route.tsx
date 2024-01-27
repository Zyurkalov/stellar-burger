import { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useCookie } from "../../utils/useCookie";
import { TProtectedRoute } from "../../types/types";
const { getCookie } = useCookie

export const ProtectedRoute: FC<TProtectedRoute> = ({ element, anonymous = false }) => {
  const refreshToken = getCookie("refreshToken")
  const location = useLocation();
  const from = location.state?.from || '/';

  if (anonymous && refreshToken) {
    return <Navigate to={ from } />;
  }
  if (!anonymous && !refreshToken) {
    return <Navigate to="/login" state={{ from: location.pathname }}/>;
  }
  return element;
}

