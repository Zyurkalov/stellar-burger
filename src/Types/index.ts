
export type TType = "bun" | "main" | "sauce";
export type TMenuList = "Конструктор" | "Лента заказов" | "Личный кабинет";
export type TOrderStatus = 'done' | 'canceled' | 'pending' | 'created'; //возможно указаны не все литеральные типы
export type TToken = "accessToken" | "refreshToken";

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
  type: TType;
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

export type TAnswerDataIngredient = {
  orders: TIngredient[];
  success: boolean;
}

export type THeaderProps = {
  errorMessage: string;
  loadingMessage: string;
  modalErrorStatus: boolean;
  modalLoadingStatus: boolean;
};
export type TBoardOrder = {
  doneList: number[]; 
  workingList: number[]; 
  total: number | null; 
  totalToday: number | null;
}

export type TListOrders = {
  createdAt: string;
  ingredients: number[];
  name: string;
  number: number;
  status: TOrderStatus; 
  updatedAt: string;
  _id: string | number;
}
