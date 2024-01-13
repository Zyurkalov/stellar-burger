import {
  DELETE_INGREDIENT,
  ADD_INGREDIENT,
  MOVE_INGREDIENT,
  CLEANING_INGREDIENT_LIST,
} from "../actions/constructor";

const ingredients = {
  // bun: [],
  // other: [],
  list: []
};

export const ingredientReducer = (state = ingredients, action) => {
  // const updatedBun = state.bun;
  // const updatedOther = [...state.other];
  const commonList = [...state.list];

  const addIngrReducer = (list, addedIngr) => {
    const check = () => {
      return list.length > 0 && list[0].type === 'bun';
    }
    if (addedIngr.type === 'bun') {
      if (check()) {
        list[0] = addedIngr;
      } else {
        list.unshift(addedIngr);
      }
    } else {
      list.push(addedIngr);
    }
  };

  switch (action.type) {
    case ADD_INGREDIENT:

      if (action.ingr.type === 'bun') {
        // updatedBun[0] = action.ingr
        // action.ingr.count = 1
        addIngrReducer(commonList, action.ingr)
      } else {
        
        addIngrReducer(commonList, action.ingr)
        // const findedTwins = updatedOther.filter((ingr) => {
        //       return ingr._id === action.ingr._id;
        //     })
        // action.ingr.count = findedTwins.length + 1;
        // updatedOther.push(action.ingr)
      }
      // return { ...state, bun: updatedBun, other: updatedOther, list: commonList};
      return { ...state, list: commonList};

    case DELETE_INGREDIENT:
      // updatedOther.splice(action.ingr, 1);
      commonList.splice(action.ingr, 1);
      return {
        ...state,
        // other: updatedOther,
        list: commonList,
      };
    case MOVE_INGREDIENT:
      const dragIndex = action.dragIndex;
      const hoverIndex = action.hoverIndex;
      // const ingredientsList = [...state.other];
      // const [movedIngredient] = ingredientsList.splice(dragIndex, 1);
      // ingredientsList.splice(hoverIndex, 0, movedIngredient);
      const ingredientsList = [...state.list];
      const [movedIngredient] = ingredientsList.splice(dragIndex, 1);
      ingredientsList.splice(hoverIndex, 0, movedIngredient);
      return {
        ...state,
        // other: ingredientsList,
        list: ingredientsList
      };
    case CLEANING_INGREDIENT_LIST:
      return {
        // bun: [],
        // other: [],
        list: [],
      }

    default:
      return state;
  }
};
