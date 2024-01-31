import { AWAIT_ORDDER_DETAILS, ERROR_ORDDER_DETAILS, GET_ORDDER_DETAILS, COMPLETED_ORDDER_DETAILS } from "../../constatnts/actions";
import { TAnswerDataIngredient } from "../../types/types";
import request from "../../utils/request";
import { AppDispatch } from "..";

export const getOrderNumberDetails = (numb: string | undefined) => {
    return function(dispatch: AppDispatch) {
        dispatch({
            type: AWAIT_ORDDER_DETAILS
        })
        request(`orders/${numb} `)
        .then((data: TAnswerDataIngredient) => {
            dispatch({
                type: GET_ORDDER_DETAILS,
                payload: data?.orders[0],
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