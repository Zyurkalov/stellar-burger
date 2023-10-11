import { useMemo } from "react";
import { useDrop, useDrag } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { deleteIngredient } from "../../../../service/actions/constructor";
import { useRef, useEffect } from "react";
import { MOVE_INGREDIENT } from "../../../../service/actions/constructor";
import {
  CurrencyIcon,
  Button,
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./constructor-cart.module.css";

export function ConstructorCart({ ingredient, index }) {
  // const { ingredient, index } = props;
  const idIngr = ingredient._id

  const ref = useRef(null);
  const cartRef = useRef(null);
  const listRef = useRef(null)
  
  const dispatch = useDispatch();
  const compDragIcon = useMemo((index) => <DragIcon key={index} />, []);

  const [{ isDrag }, dragRef] = useDrag({
    type: "draggingIngr",
    // item: ingredient,
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

 const [{handlerId}, dropRef] = useDrop({
  accept: "draggingIngr",
  collect: (monitor) => {
    return {
      handlerId: monitor.getHandlerId(),
    }
  },
  hover(item, monitor) {
    if (!ref.current) {
      return
    }
    const dragIndex = item.index;
    const hoverIndex = index;
    if (dragIndex === hoverIndex) {
      return;
    }
    //высчитываем координаты, внутри dropRef:
    const clientOffset = monitor.getClientOffset();
    const boundingRect = ref.current?.getBoundingClientRect();

    const boundingCountY = (boundingRect.bottom - boundingRect.top)/2;
    const hoverCountY = clientOffset.y - boundingRect.top;

    if (dragIndex < hoverIndex &&  hoverCountY < boundingCountY) {
      console.log('false')
      return;
    }
    if (dragIndex > hoverIndex &&  hoverCountY > boundingCountY) {
      console.log('false')
      return;
    }
    // if (dragIndex !== hoverIndex &&  hoverCountY !== boundingCountY) {
    //   console.log('false')
    //   return;
    // }
    console.log('true')
    item.index = hoverIndex;
    dispatch({ type: MOVE_INGREDIENT, data: { hoverIndex: hoverIndex, dragIndex: dragIndex } });
  }
 })

  // useEffect(() => {
  //   if (listRef.current) {
  //     const boundingRect = listRef.current.getBoundingClientRect();
  //     console.log('Top:', boundingRect.top);
  //     console.log('Bottom:', boundingRect.bottom);
  //   }
  // }, [listRef.current]);
  dragRef(dropRef(ref));

  return (
    // !isDrag ? (
      <li className={`mb-4 ${style.component}`} ref={ref}>
        <div>{compDragIcon}</div>
        <ConstructorElement
          key={index}
          text={ingredient.name}
          price={ingredient.price}
          thumbnail={ingredient.image_mobile}
          handleClose={() => dispatch(deleteIngredient(index + 1))}
        />
      </li>
    // ) : (
    //   <li className={`mb-4 ${style.dragging}`}></li>
    // )
  );
}
