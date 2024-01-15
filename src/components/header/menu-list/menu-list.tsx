import style from "./menu-list.module.css";
import { useState, FC } from "react";
import { TMenuList } from "../../../Types/type";
import { TIconProps } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils";

const MenuList: FC<{text: TMenuList, icon: TIconProps | any, active: boolean} > = ({ text, icon: Component, active }): JSX.Element =>  {
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
      <Component type={hover || active ? type.active : type.disabled} />
      <button
        className={`text text_type_main-default ${style.transition}`}
        style={
          hover || active ? { color: color.active } : { color: color.disabled }
        }
      >
        {text}
      </button>
    </li>
  );
}
export default MenuList;
