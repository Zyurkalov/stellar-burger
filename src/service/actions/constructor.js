export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";
export const MOVE_INGREDIENT = "MOVE_INGREDIENT";

export const addIngredient = (ingr) => ({
  type: ADD_INGREDIENT,
  ingr: ingr,
});

export const deleteIngredient = (index) => ({
  type: DELETE_INGREDIENT,
  ingr: index + 1,
});
// здесь мы добавляем входящим индексам +1
// поскольку ingrList - общий массив игредиентов, а индексы мы получаем
// из отфильтрованного масива, отличающийся от родительского ingrList одним элементом - bun[0]

export const moveIngredient = (hoverIndex, dragIndex) => ({
  type: MOVE_INGREDIENT,
  hoverIndex: hoverIndex + 1,
  dragIndex: dragIndex + 1,
});
