import style from "./menu-list.module.css"
import React from 'react';

class MenuList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isHovered: false,
        }
      }
      handleMouseEnter = () => {
        this.setState({isHovered: true})
      }
      handleMouseLeave = () => {
        this.setState({isHovered: false})
      }

    render() {
        const { icon: Component, text, link} = this.props;
        const { isHovered } = this.state;

        const RenderCompanent = {
            backgroundColor: isHovered ? 'lightblue' : 'white',
          };

        return (
        <li className={style.menuElem}>
            <Component />
            <button onClick={link} className={"text text_type_main-default ml-4"}>{text}</button>
        </li>
        )
    }
    }

export default MenuList