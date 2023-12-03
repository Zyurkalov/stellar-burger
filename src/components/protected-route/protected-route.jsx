
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCookie } from "../../utils/useCookie";
const { getCookie } = useCookie

export function ProtectedRoute({ element, anonymous = false }) {
  const isLoggedIn = useSelector((store) => store.user.isLoggedIn);
  const refreshToken = getCookie("refreshToken")

  const location = useLocation();
  const from = location.state?.from || '/';

  if (anonymous && refreshToken) {
    return <Navigate to={ from } />;
  }
  if (!anonymous && !refreshToken) {
    return <Navigate to="/login" state={{ from: location }}/>;
  }
  return element;
}

