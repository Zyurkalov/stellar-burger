import { v4 as uuidv4 } from 'uuid';
import { TIngredient } from '../../types/types';
import { ADD_INGREDIENT, DELETE_INGREDIENT, MOVE_INGREDIENT, CLEANING_INGREDIENT_LIST } from '../../constatnts/actions';

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
