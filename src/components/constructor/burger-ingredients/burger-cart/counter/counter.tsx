import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredient } from "../../../../../Types/type";
import { ReactNode } from 'react';

export const counterComponent: ReactNode = (targetIngr: TIngredient, listIngr: TIngredient[]) => {
  const { type, _id } = targetIngr;

  const findedCopyIngr = listIngr.filter((ingr) => {
    return ingr._id === _id;
  }).length;
  const counter = (count:number = 0, factor:number = 1) => (
    <Counter count={count * factor} size="default" extraClass="m-1" />
  );

  return type !== "bun"
    ? findedCopyIngr > 0
      ? counter(findedCopyIngr)
      : null
    : listIngr.length > 0 && listIngr[0]._id === _id
    ? counter(2) // булочка если есть, их всегда две
    : null;
};
