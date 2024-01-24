
export type TType = "bun" | "main" | "sauce";
export type TMenuList = "Конструктор" | "Лента заказов" | "Личный кабинет";
export type TOrderStatus = 'done' | 'canceled' | 'pending' | 'created' | undefined; //возможно указаны не все литеральные типы
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
  _id: string;
};

export type TProtectedRoute = {
  element: JSX.Element;
  anonymous?: boolean;
};

export type TUser = {
  email: string;
  password: string;
  name?: string
};

export type TRegistration = {
  name: string;
} & TUser;

export type TAnswerDataIngredient = {
  orders: TIngredient[];
  success: boolean;
}

export type THeaderProps = {
  errorMessage: string | null;
  loadingMessage: string | null;
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
  createdAt: number | string;
  ingredients: string[] | null;
  name: string;
  number: number;
  status: TOrderStatus; 
  updatedAt: number | string;
  _id: string | number;
}

