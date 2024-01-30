import { TIngredient, TType, TOrders } from "../../types/types";
// import { TIngredient, TType, TOrders, TRegistration } from "../../types";

export type TInitialStateApp = {
  dataRequest: boolean;
  dataFailed: boolean;
  data: TIngredient[] | [];
  error: string | null;
};
export type TInitialStateBurgerConstructor = {
  orderRequest: boolean;
  orderFailed: boolean;
  orderSuccess: boolean;
  orderNumber: number | null;
  text: string | null;
};
export type TInitialStateBurgerIngredient = {
  current: TType;
};
export type TInitialStateIngredient = {
  list: TIngredient[] | [];
};
export type TInitialStateModal = {
  modalOrderStatus: boolean;
  modalIngrStatus: boolean;
  modalLoadingStatus: boolean;
  modalErrorStatus: boolean;
  compIngr: TIngredient[] | {};
  loadingMessage: string | null;
  errorMessage: string | null;
};
export type TInitialStateOrderNumber = {
  request: boolean;
  order: boolean;
  error: string | null;
};
export type TInitialStateUserAuth = {
  userData: {email: string, name: string};
//   userData: TRegistration;
  loading: { status: boolean; message: string };
};
export type TInitialStateWcReducer = {
  status: "CONNECTING" | "ONLINE" | "OFFLINE";
  orders: TOrders[] | [];
  error: string | null;
};
