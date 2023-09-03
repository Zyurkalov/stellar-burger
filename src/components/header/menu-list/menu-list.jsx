import style from "./menu-list.module.css";
import React from "react";

class MenuList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false,
      type: "primary",
      styles: {color: "#F2F2F3"}
    };
  }
  handleMouseEnter = () => {
    this.setState({type: "secondary", styles: {color: "#8585AD"}});
  };
  handleMouseLeave = () => {
    this.setState({type: "primary", styles: {color: "#F2F2F3"}});
  };
 
  render() {
    const { icon: Component, text, link} = this.props;

    return (
      <li
        className={style.menuElem}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <Component type={this.state.type} />
        <button onClick={link} className={"text text_type_main-default"} style={this.state.styles}>
          {text}
        </button>
      </li>
    );
  }
}

export default MenuList;
