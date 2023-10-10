import { useMemo } from "react";
import { useDrop, useDrag } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { deleteIngredient } from "../../../../service/actions/constructor";
import { useRef, useEffect } from "react";
import {
  CurrencyIcon,
  Button,
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./constructor-cart.module.css";

export function ConstructorCart(props) {
  const { ingredient, index } = props;

  const ref = useRef(null);
  const cartRef = useRef(null);
  const listRef = useRef(null)
  
  const dispatch = useDispatch();
  const compDragIcon = useMemo((index) => <DragIcon key={index} />, []);

  const [{ isDrag }, dragRef] = useDrag({
    type: "draggingIngr",
    item: ingredient,
    end: () => {
      dispatch(deleteIngredient(index + 1));
    },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });
  useEffect(() => {
    if (listRef.current) {
      const boundingRect = listRef.current.getBoundingClientRect();
      console.log('Top:', boundingRect.top);
      console.log('Bottom:', boundingRect.bottom);
    }
  }, [listRef.current]);

  return (
    !isDrag ? (
      <li className={`mb-4 ${style.component}`} ref={(node) => {
        listRef.current = node;;
        dragRef(node);
      }}>
        <div>{compDragIcon}</div>
        <ConstructorElement
          key={index}
          text={ingredient.name}
          price={ingredient.price}
          thumbnail={ingredient.image_mobile}
          handleClose={() => dispatch(deleteIngredient(index + 1))}
        />
      </li>
    ) : (
      <li className={`mb-4 ${style.dragging}`} ref={dragRef}></li>
    )
  );
}
