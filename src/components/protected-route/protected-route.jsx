import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({ element }) {
  const { userAuthStatus, userData } = useSelector((state) => state.userStatus);

  if (!userData.name && !userData.email) {
    console.log(userData)
    // return <Navigate to="/login" replace/>;
  }
  return  element;
}
