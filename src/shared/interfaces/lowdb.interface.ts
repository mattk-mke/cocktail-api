import { ICocktail, IIngredient } from "./cocktail.interface";

export interface IDBSchema {
    cocktails: ICocktail[];
    ingredients: IIngredient[];
    counts: {
        [key: string]: number;
    };
}
