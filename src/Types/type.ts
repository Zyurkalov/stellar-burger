export {};

export type TIngredient = {
  calories: number;
  carbohydrates: number;
  // count?: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number;
  type: string;
  uniqueId?: string;
  __v: number | string;
  _id: number | string;
};

export type TProtectedRoute = {
  element: JSX.Element;
  anonymous?: boolean;
};

export type TUser = {
  email: string;
  name: string;
};

export type TRegistration = {
  password: string;
} & TUser;

// export type TNavigation = "/" | "/feed" | "/profile" | "/profile/orders";
export type TMenuList = "Конструктор" | "Лента заказов" | "Личный кабинет";

export type THeaderProps = {
  errorMessage: string;
  loadingMessage: string;
  modalErrorStatus: boolean;
  modalLoadingStatus: boolean;
};
