import {
  DELETE_INGREDIENT,
  ADD_INGREDIENT,
  MOVE_INGREDIENT,
  CLEANING_INGREDIENT_LIST,
} from "../actions/constructor";

const ingredients = {
  bun: [],
  other: [],
};

export const ingredientReducer = (state = ingredients, action) => {
  const updatedBun = state.bun;
  const updatedOther = [...state.other];

  switch (action.type) {
    case ADD_INGREDIENT:

      if (action.ingr.type === 'bun') {
        updatedBun[0] = action.ingr
        action.ingr.count = 1
      } else {
        const findedTwins = updatedOther.filter((ingr) => {
              return ingr._id === action.ingr._id;
            })
        action.ingr.count = findedTwins.length + 1;
        updatedOther.push(action.ingr)
      }
      return { ...state, bun: updatedBun, other: updatedOther};

    case DELETE_INGREDIENT:
      updatedOther.splice(action.ingr, 1);
      return {
        ...state,
        other: updatedOther
      };
    case MOVE_INGREDIENT:
      const dragIndex = action.dragIndex;
      const hoverIndex = action.hoverIndex;
      const ingredientsList = [...state.other];
      const [movedIngredient] = ingredientsList.splice(dragIndex, 1);
      ingredientsList.splice(hoverIndex, 0, movedIngredient);
      return {
        ...state,
        other: ingredientsList,
      };
    case CLEANING_INGREDIENT_LIST:
      return {
        bun: [],
        other: [],
      }

    default:
      return state;
  }
};
