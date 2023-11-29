import { useEffect } from "react";
import { useNavigate, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";


export function ProtectedRoute({ element, anonymous = false }) {
  const isLoggedIn = useSelector((store) => store.user.isLoggedIn);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  console.log(`from ${from}`)
  if (anonymous && isLoggedIn) {
    return <Navigate to={ from } />;
  }
  if (!anonymous && !isLoggedIn) {
    return <Navigate to="/login" state={{ from: location}}/>;
  }
  // useEffect(() => {
  //   if (!localStorage.accessToken) {
  //     navigate("login");
  //     // return <Navigate to="login" replace /*state={{from: location}}*/ />
      
  //   }
  // },[])
  return element;
}

