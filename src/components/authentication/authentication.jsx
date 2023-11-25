import style from "./authentication.module.css";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RegisterLink } from "./register/register-link";
import { LoginLink } from "./login/login-link";
import { checkUserAuth } from "../../service/actions/user-auth";
import { ForgotPasswordLink } from "./forgot-password/forgot-password-link";
import PropTypes from "prop-types";

export function Authentication(props) {
  const dispatch = useDispatch()

  const { title, children } = props;
  const component = children.type.name;
  const { userData } = useSelector((state) => state.userStatus);

  useEffect(() => {
    if(!userData.name || !userData.email) {
      dispatch(checkUserAuth());
    } 
  }, []);
  
  return (
    (localStorage.accessToken)
    ?<Navigate to="/" replace />
    : (<>
      <div className={style.container}>
        <h1 className={`mb-6 text text_type_main-medium ${style.title}`}>
          {title}
        </h1>
        {children}
      </div>
      {component === "LoginComponent" ? (
        <LoginLink />
      ) : component === "RegisterComponent" ? (
        <RegisterLink />
      ) : component === "ForgotPassworComponent" || "ResetPassworComponent" ? (
        <ForgotPasswordLink />
      ) : null}
    </>)
  );
}
Authentication.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};
