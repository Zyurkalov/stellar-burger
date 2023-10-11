import {
  DELETE_INGREDIENT,
  ADD_INGREDIENT,
  MOVE_INGREDIENT,
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
      updatedIngr[action.payload].count = 1;
      updatedIngr.splice(action.payload, 1);
      return {
        ...state,
        ingrList: updatedIngr,
      };
    case MOVE_INGREDIENT:
      const dragIndex = action.data.dragIndex + 1;
      const hoverIndex = action.data.hoverIndex + 1;
      // здесь мы добавляем входящим индексам +1
      // поскольку ingrList - общий массив игредиентов, а индексы мы получаем
      // из отфильтрованного масива, отличающийся от родительского ingrList одним элементом - bun[0]

      const ingredientsList = [...state.ingrList];
      const [movedIngredient] = ingredientsList.splice(dragIndex, 1);
      ingredientsList.splice(hoverIndex, 0, movedIngredient);
      return {
        ...state,
        ingrList: ingredientsList,
      };

    default:
      return state;
  }
};
