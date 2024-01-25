import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredient } from "../../../../../types";
import { ReactNode } from 'react';

export const СounterComponent = (targetIngr: TIngredient, listIngr: TIngredient[]): ReactNode => {
  const { type, _id } = targetIngr;

  const foundCopyIngr = listIngr.filter((ingr) => {
    return ingr._id === _id;
  }).length;
  const counter = (count:number = 0, factor:number = 1) => (
    <Counter count={count * factor} size="default" extraClass="m-1" />
  );

  if (type !== "bun") {
    return foundCopyIngr > 0 ? counter(foundCopyIngr) : null;
  } else {
    return listIngr.length > 0 && listIngr[0]._id === _id ? counter(2) : null;
  }
};
