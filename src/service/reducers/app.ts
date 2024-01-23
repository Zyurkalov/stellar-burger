import { AWAIT_DATA, GET_DATA_FAILED, GET_DATA_SUCCESS, TAppAction } from "../actions/app";
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from "./index"
import { TIngredient } from "../../Types";

type TInitialState = {
  dataRequest: boolean;
  dataFailed: boolean;
  data: TIngredient[] | [];
  error: string | null;
}
const initialState: TInitialState = {
  dataRequest: false,
  dataFailed: false,
  data: [],
  error: '',
};
export const getDataReducer = (state = initialState, action: TAppAction):TInitialState => {
  switch (action.type) {
    case AWAIT_DATA: {
      return {
        ...state,
        dataRequest: true,
        dataFailed: false,
        error: '',
      }
    }
    case GET_DATA_SUCCESS: {
      return {
        ...state,
        dataRequest: false,
        dataFailed: false,
        data: action.feed
      }
    }
    case GET_DATA_FAILED: {
      return {
        ...state,
        dataRequest: false,
        dataFailed: true,
        error: action.error
      }
    }
    default: {
      return state
    }
  }
}