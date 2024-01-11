import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";

export const counterComponent = (targetIngr, listIngr, listBun) => {
  const { type, _id } = targetIngr;
  const findedCopyIngr = listIngr.filter((ingr) => {
    return ingr._id === _id;
  });
  const counter = (list, factor = 1) => (
    <Counter count={list.length * factor} size="default" extraClass="m-1" />
  );

  return type !== "bun"
    ? findedCopyIngr.length > 0
      ? counter(findedCopyIngr)
      : null
    : listBun.length > 0 && listBun[0]._id === _id
    ? counter(listBun, 2)
    : null;
};
