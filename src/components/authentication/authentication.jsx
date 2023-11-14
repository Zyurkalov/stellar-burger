import style from "./authentication.module.css";
import { RegisterLink } from "./register/register-link";
import { LoginLink } from "./login/login-link";
import { ForgotPasswordLink } from "./forgot-password/forgot-password-link";
import PropTypes from "prop-types";

export function Authentication(props) {
  const { title, children } = props;
  const component = children.type.name;
  return (
    <>
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
    </>
  );
}
Authentication.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};
