import { AlcoholOption } from "./thecocktaildb.interface";

export interface ICocktail {
    id?: string;
    dateModified?: string; // ISO DateTime
    name: string;
    nameAlternate: string | null;
    tags: string[];
    videoUrl: string | null;
    category: string;
    iba: string | null;
    alcoholOption: AlcoholOption;
    glassType: string | null;
    instructions: {
        [key: string]: string;
    };
    imageUrl: string | null;
    imageSrc: string | null;
    imageAttribution: string | null;
    isCreativeCommonsConfirmed: boolean;
    ingredients: IIngredientStub[];
}

export interface IIngredientStub {
    name: string;
    measurement: string;
}

export interface IIngredient {
    id: string;
    name: string;
    description: string | null;
    type: string | null;
    isAlcohol: boolean;
    abv: number | null;
    dateModified: string | null;
}
