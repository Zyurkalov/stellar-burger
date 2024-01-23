import { v4 as uuidv4 } from 'uuid';
import { TIngredient } from '../../Types';

export const ADD_INGREDIENT: "ADD_INGREDIENT" = "ADD_INGREDIENT";
export const DELETE_INGREDIENT: "DELETE_INGREDIENT" = "DELETE_INGREDIENT";
export const MOVE_INGREDIENT: "MOVE_INGREDIENT" = "MOVE_INGREDIENT";
export const CLEANING_INGREDIENT_LIST: "CLEANING_INGREDIENT_LIST" = "CLEANING_INGREDIENT_LIST"

type TAddIngredient = {
  readonly type: typeof ADD_INGREDIENT,
  readonly ingr: TIngredient & {uniqueId: string}
}
type TDeleteIngredient = {
  readonly type: typeof DELETE_INGREDIENT,
  readonly ingr: number
}
type TMoveIngredient = {
  readonly type: typeof MOVE_INGREDIENT,
  readonly hoverIndex: number,
  readonly dragIndex: number,
}
type TCleaninIngredientList = {
  readonly type: typeof CLEANING_INGREDIENT_LIST
}
export type TConsructorAction = TAddIngredient | TDeleteIngredient | TMoveIngredient | TCleaninIngredientList

export const addIngredient = (ingr: TIngredient) => ({
  type: ADD_INGREDIENT,
  ingr: {
    ...ingr,
    uniqueId: uuidv4()
  }
});
export const deleteIngredient = (index: number) => ({
  type: DELETE_INGREDIENT,
  ingr: index,
});
export const moveIngredient = (hoverIndex: number, dragIndex: number) => ({
  type: MOVE_INGREDIENT,
  hoverIndex: hoverIndex,
  dragIndex: dragIndex,
});
export const cleaningIngredientList = () => ({
  type: CLEANING_INGREDIENT_LIST,
})
