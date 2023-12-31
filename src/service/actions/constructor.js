import { v4 as uuidv4 } from 'uuid';
export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";
export const MOVE_INGREDIENT = "MOVE_INGREDIENT";
export const CLEANING_INGREDIENT_LIST = "CLEANING_INGREDIENT_LIST"

export const addIngredient = (ingr) => ({
  type: ADD_INGREDIENT,
  ingr: {
    ...ingr,
    uniqueId: uuidv4()
  }
});
export const deleteIngredient = (index) => ({
  type: DELETE_INGREDIENT,
  ingr: index,
});
export const moveIngredient = (hoverIndex, dragIndex) => ({
  type: MOVE_INGREDIENT,
  hoverIndex: hoverIndex,
  dragIndex: dragIndex,
});
export const cleaningIngredientList = () => ({
  type: CLEANING_INGREDIENT_LIST,
})
