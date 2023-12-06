import { useMemo } from "react";
import { useDrop, useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import {
  deleteIngredient,
  moveIngredient,
} from "../../../../service/actions/constructor";
import { oneIngrPropType } from "../../../../utils/prop-types";
import { useRef } from "react";
import PropTypes from "prop-types";

import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./constructor-cart.module.css";

export function ConstructorCart({ ingredient, index }) {
  const idIngr = ingredient._id;

  const ref = useRef(null);
  const dispatch = useDispatch();
  const compDragIcon = useMemo((index) => <DragIcon key={index} />, []);

  const [{ isDrag }, dragRef] = useDrag({
    type: "draggingIngr",
    item: () => {
      return { idIngr, index };
    },
    // end: () => {
    //   dispatch(deleteIngredient(index + 1));
    // },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const [{ handlerId }, dropRef] = useDrop({
    accept: "draggingIngr",
    collect: (monitor) => {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      //высчитываем координаты, внутри dropRef:
      const clientOffset = monitor.getClientOffset();
      const boundingRect = ref.current?.getBoundingClientRect();

      const boundingCountY = (boundingRect.bottom - boundingRect.top) / 2;
      const hoverCountY = clientOffset.y - boundingRect.top;

      if (dragIndex === hoverIndex && hoverCountY === boundingCountY) {
        return;
      }

      item.index = hoverIndex;
      dispatch(moveIngredient(hoverIndex, dragIndex));
    },
  });
  dragRef(dropRef(ref));

  return (
    <li className={`mb-4 ${style.component}`} ref={ref}>
      <div>{compDragIcon}</div>
      <ConstructorElement
        key={index}
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image_mobile}
        handleClose={() => dispatch(deleteIngredient(index))}
      />
    </li>
  );
}

ConstructorCart.propTypes = {
  ingredient: oneIngrPropType.isRequired,
  index: PropTypes.number,
};
