import { TAnswerDataIngredient, TIngredient } from "../../Types";
import request from "../../utils/request";
import { AppDispatch } from "../reducers";

export const AWAIT_ORDDER_DETAILS: 'AWAIT_ORDDER_DETAILS' = 'AWAIT_ORDDER_DETAILS'
export const ERROR_ORDDER_DETAILS: 'ERROR_ORDDER_DETAILS' = 'ERROR_ORDDER_DETAILS'
export const GET_ORDDER_DETAILS: 'GET_ORDDER_DETAILS' = 'GET_ORDDER_DETAILS'
export const COMPLETED_ORDDER_DETAILS: 'COMPLETED_ORDDER_DETAILS' = 'COMPLETED_ORDDER_DETAILS'

export const typeOrderAction = {
    actionAwait: AWAIT_ORDDER_DETAILS,
    actionError: ERROR_ORDDER_DETAILS,
    actionGet: GET_ORDDER_DETAILS,
    actionCompleted: COMPLETED_ORDDER_DETAILS,
}
type TAwaitOrderDetails = {
    type: typeof AWAIT_ORDDER_DETAILS;
    request: boolean;
  }
  type TCompletedOrderDetails = {
    type: typeof COMPLETED_ORDDER_DETAILS;
    request: boolean;
    error: boolean;
  }
  type TErrorOrderDetails = {
    type: typeof ERROR_ORDDER_DETAILS;
    request: boolean;
    error: string;
  }
  type TGetOrderDetails = {
    type: typeof GET_ORDDER_DETAILS;
    request: boolean;
    error: boolean;
    payload: TIngredient[];
  }
export type TOrderNumberAction = TAwaitOrderDetails | TCompletedOrderDetails | TErrorOrderDetails | TGetOrderDetails

export const getOrderNumberDetails = (numb: number | string) => {
    return function(dispatch: AppDispatch) {
        dispatch({
            type: AWAIT_ORDDER_DETAILS
        })
        request(`orders/${numb} `)
        .then((data: TAnswerDataIngredient) => {
            dispatch({
                type: GET_ORDDER_DETAILS,
                payload: data.orders[0],
            })
        })
        .catch((err) => {
            dispatch({
                type: ERROR_ORDDER_DETAILS,
                error: err,
            })
        })
        .finally(() => {
            dispatch({
                type: COMPLETED_ORDDER_DETAILS
            })
        })
        
    }
}