import { useMemo, FC, useRef } from "react";
import { useDrop, useDrag } from "react-dnd";
import { useAppDispatch } from "../../../../utils/hooks/useAppStore";
import {
  deleteIngredient,
  moveIngredient,
} from "../../../../service/actions/constructor";
import { TIngredient } from "../../../../types";

import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./constructor-cart.module.css";

export const ConstructorCart: FC<{ingredient: TIngredient, index: number}> = ({ ingredient, index }) => {
  const ref = useRef(null);
  const dispatch = useAppDispatch();
  const idIngr = ingredient._id;
  
  const createDragIcon = (index: number) => <DragIcon key={index} type="primary"/>;
  const compDragIcon = useMemo(() => createDragIcon(index), [index]);

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
    hover(item: {idIngr: string | number, index: number}, monitor) {
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
      const boundingRect = (ref.current as HTMLElement | null)?.getBoundingClientRect();

      const boundingCountY = boundingRect ? (boundingRect.bottom - boundingRect.top) / 2 : 0;
      const hoverCountY = boundingRect ? (clientOffset ? clientOffset.y - boundingRect.top : null) : 0;

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

// ConstructorCart.propTypes = {
//   ingredient: oneIngrPropType.isRequired,
//   index: PropTypes.number,
// };
