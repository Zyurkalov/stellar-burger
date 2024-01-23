import { RegisterLink } from "./registration/registration-link";
import { LoginLink } from "./login/login-link";
import { ForgotPasswordLink } from "./forgot-password/forgot-password-link";

import PropTypes from "prop-types";
import style from "./authentication.module.css";
import { FC } from "react";

export const Authentication: FC<{title: string, children: any}> = ({title, children}) => {
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
// Authentication.propTypes = {
//   children: PropTypes.node.isRequired,
//   title: PropTypes.string.isRequired,
// };
