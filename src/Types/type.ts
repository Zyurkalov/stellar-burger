export {};

export interface TIngredient {
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
}