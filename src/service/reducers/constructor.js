import { DELETE_INGREDIENT, ADD_INGREDIENT } from "../actions/constructor";

const ingredients = {
  ingrList: [],
};

export const ingredientReducer = (state = ingredients, action) => {
  const updatedIngr = [...state.ingrList];
  switch (action.type) {
    case ADD_INGREDIENT:
      if (
        updatedIngr.length > 0 &&
        updatedIngr[0].type === action.payload.type
      ) {
        updatedIngr[0] = action.payload;
        action.payload.count = 1;
      } else {
        const findedTwins = updatedIngr.filter((ingr) => {
          return ingr._id === action.payload._id;
        });
        action.payload.count = findedTwins.length + 1;
        updatedIngr.push(action.payload);
      }

      return { ...state, ingrList: updatedIngr };

    case DELETE_INGREDIENT:
      updatedIngr[action.payload].count -= 1;
      updatedIngr.splice(action.payload, 1);
      return {
        ...state,
        ingrList: updatedIngr,
      };

    default:
      return state;
  }
};
