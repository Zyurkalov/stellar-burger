import style from "./menu-list.module.css";
import React from "react";

class MenuList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false,
      type: "secondary",
      styles: {color: "#8585AD"}
    };
  }

  handleMouseEnter = () => {
    this.setState({type: "primary", styles: {color: "#F2F2F3"}});
  };
  handleMouseLeave = () => {
    this.setState({type: "secondary", styles: {color: "#8585AD"}});
  };
 
  render() {
    const { icon: Component, text, link, active} = this.props;

    if (active) {
      return (
        <li className={style.menuElem}>
        <Component type={{type: "primary"}} />
        <button onClick={link} className={"text text_type_main-default"} style={{color: "#F2F2F3"}}>
          {text}
        </button>
      </li>
      )
    }
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
