import style from "./menu-list.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";

function MenuList({ text, icon: Component, active }) {

  const color = {
    active: "#F2F2F3",
    disabled: "#8585AD",
  };
  const type = {
    active: "primary",
    disabled: "secondary",
  };
  const token = localStorage.accessToken
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
          // (hover && token) || (active && token)
          (hover || active )
            ? type.active
            : type.disabled
        }
      />
      
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

      {/* <button
        className={`text text_type_main-default ${style.transition}`}
        style={
          hover && localStorage.accessToken || active && localStorage.accessToken ? { color: color.active } : { color: color.disabled }
        }
      >
        {text}
      </button> */}
    </li>
  );
}
export default MenuList;
