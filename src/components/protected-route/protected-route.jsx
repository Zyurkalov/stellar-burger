
import { Navigate, useLocation } from "react-router-dom";
import { useCookie } from "../../utils/useCookie";
const { getCookie } = useCookie

export function ProtectedRoute({ element, anonymous = false }) {
  const refreshToken = getCookie("refreshToken")
  const location = useLocation();
  const from = location.state?.from || '/';
  console.log(anonymous)
  console.log(refreshToken)

  if (anonymous && refreshToken) {
    return <Navigate to={ from } />;
  }
  if (!anonymous && !refreshToken) {
    return <Navigate to="/login" state={{ from: location }}/>;
  }
  return element;
}

