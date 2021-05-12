import { AlcoholOption } from "./thecocktaildb.interface";

export interface ICocktail {
    id: string;
    dateModified: string; // ISO DateTime
    name: string;
    nameAlternate?: string;
    tags: string[];
    videoUrl?: string;
    category: string;
    iba?: string;
    alcoholOption: AlcoholOption;
    glassType?: string;
    instructions: {
        [key: string]: string;
    };
    imageUrl?: string;
    imageSrc?: string;
    imageAttribution?: string;
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
    description?: string;
    type: string;
    isAlcohol: boolean;
    abv?: string;
}
