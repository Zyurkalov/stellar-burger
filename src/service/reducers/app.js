import { GET_DATA } from "../actions/app"

const initialState = {
    data: null,
  };

export const getDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DATA:
          return {
            ...state,
            data: action.payload,
          };
        default:
          return state;
      }
    };