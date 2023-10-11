export const ADD_INGREDIENT = "ADD_INGREDIENT"
export const DELETE_INGREDIENT = "DELETE_INGREDIENT"
export const MOVE_INGREDIENT = "MOVE_INGREDIENT"

export const addIngredient = (ingr) => ({
    type: ADD_INGREDIENT,
    payload: ingr
})

export const deleteIngredient = (index) => ({
    type: DELETE_INGREDIENT,
    payload: index
})

// moveIngredient смотреть в constructor-cart.jsx

// export const moveIngredient = (data) => ({
//     type: MOVE_INGREDIENT,
//     payload: data
// })