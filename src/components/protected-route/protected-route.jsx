import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({ element }) {
  const { userAuthStatus } = useSelector((state) => state.userStatus);

  if (!userAuthStatus) {
    return <Navigate to="/login" replace/>;
  }
  return  element;
}
