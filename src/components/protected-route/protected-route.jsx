import { useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";

export function ProtectedRoute({ element }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.accessToken) {
      navigate("login");
      // return <Navigate to="login" replace /*state={{from: location}}*/ />
    }
  },[])
  return element;
}
