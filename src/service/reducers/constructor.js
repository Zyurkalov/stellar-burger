import {
  DELETE_INGREDIENT,
  ADD_INGREDIENT,
  MOVE_INGREDIENT,
  CLEANING_INGREDIENT_LIST,
} from "../actions/constructor";

const ingredients = {
  ingrList: [],
};

export const ingredientReducer = (state = ingredients, action) => {
  const updatedIngr = [...state.ingrList];
  switch (action.type) {
    case ADD_INGREDIENT:
      if (
        updatedIngr.length > 0 &&
        updatedIngr[0].type === action.ingr.type
      ) {
        updatedIngr[0] = action.ingr;
        // action.ingr.count = 1;
      } else {
        const findedTwins = updatedIngr.filter((ingr) => {
          return ingr._id === action.ingr._id;
        });
        // action.ingr.count = findedTwins.length + 1;
        updatedIngr.push(action.ingr);
      }

      return { ...state, ingrList: updatedIngr };

    case DELETE_INGREDIENT:
      updatedIngr[action.ingr].count -= 1;
      updatedIngr.splice(action.ingr, 1);
      return {
        ...state,
        ingrList: updatedIngr,
      };
    case MOVE_INGREDIENT:
      const dragIndex = action.dragIndex;
      const hoverIndex = action.hoverIndex;
      
      const ingredientsList = [...state.ingrList];
      const [movedIngredient] = ingredientsList.splice(dragIndex, 1);
      ingredientsList.splice(hoverIndex, 0, movedIngredient);
      return {
        ...state,
        ingrList: ingredientsList,
      };
    case CLEANING_INGREDIENT_LIST:
      return {
        ingrList: [],
      }

    default:
      return state;
  }
};
