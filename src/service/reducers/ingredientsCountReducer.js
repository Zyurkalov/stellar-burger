const defaultState = {
    count: 0
}

export const ingredientsCountReducer = (state=defaultState, action) => {
    switch (action.type) {
        case("INCREMENT"):
        return {...state, count: state.count + 1}
        case("DECREMENT"):
        return {...state, count: state.count - 1}
        default:
            return state
    }
}