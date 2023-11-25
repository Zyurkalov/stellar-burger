import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function ProtectedRoute({ element }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.accessToken) {
      navigate("login");
    }
  },[])
  return element;
}
