import style from "./menu-list.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";

function MenuList(props) {
  const { text, icon: Component, active } = props;
  const { userAuthStatus } = useSelector((state) => state.userStatus);

  const color = {
    active: "#F2F2F3",
    disabled: "#8585AD",
  };
  const type = {
    active: "primary",
    disabled: "secondary",
  };

  const [hover, setHover] = useState(false);

  const handleMouseEnter = () => {
    setHover(true);
  };
  const handleMouseLeave = () => {
    setHover(false);
  };
  return (
    <li
      className={style.menuElem}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <Component
        type={
          (hover && userAuthStatus) || (active && userAuthStatus)
            ? type.active
            : type.disabled
        }
      />
      {userAuthStatus ? (
        <button
          className={`text text_type_main-default ${style.transition}`}
          style={
            hover || active
              ? { color: color.active }
              : { color: color.disabled }
          }
        >
          {text}
        </button>
      ) : (
        <button
          disabled
          className={`text text_type_main-default ${style.transition}`}
          style={{ color: color.disabled }}
        >
          {text}
        </button>
      )}

      {/* <button
        className={`text text_type_main-default ${style.transition}`}
        style={
          hover && userAuthStatus || active && userAuthStatus ? { color: color.active } : { color: color.disabled }
        }
      >
        {text}
      </button> */}
    </li>
  );
}
export default MenuList;
