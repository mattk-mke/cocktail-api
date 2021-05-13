import axios from "axios";
import {
    FilterParam,
    ICocktailDBResponse,
    IDBCocktail,
    IDBCocktailStub,
    IDBIngredient
} from "../interfaces/thecocktaildb.interface";

export class CocktailDBService {
    private baseUrl: string = "https://www.thecocktaildb.com/api/json/v1/1";

    /**
     * Makes a request to the Cocktail DB api, given the params
     */
    private baseRequest<T>(endpoint: string, query: { [key: string]: string }) {
        return axios.get<ICocktailDBResponse<T>>(`${this.baseUrl}/${endpoint}.php`, {
            params: query,
            responseType: "json"
        });
    }

    /**
     * Fetches cocktails from thecocktaildb api, filtered by the specified parameter and value
     */
    public async filterDrinks(param: FilterParam, value: string): Promise<IDBCocktailStub[]> {
        try {
            if (!param || !value) {
                throw new Error("Invalid request");
            }
            const res = await this.baseRequest<IDBCocktailStub[]>("filter", {
                [param]: value
            });
            const data = res.data;
            if (data && data.drinks) {
                return data.drinks;
            } else {
                throw new Error("Invalid response");
            }
        } catch (err) {
            return [];
        }
    }

    /**
     * Searches cocktails from thecocktaildb api based on the text input
     */
    public async searchCocktails(searchText: string): Promise<IDBCocktail[]> {
        try {
            if (!searchText) {
                throw new Error("Invalid request");
            }
            const res = await this.baseRequest<IDBCocktail[]>("search", {
                s: searchText
            });
            const data = res.data;
            if (data && data.drinks) {
                return data.drinks;
            } else {
                throw new Error("Invalid response");
            }
        } catch (err) {
            return [];
        }
    }

    /**
     * Searches ingredients from thecocktaildb api based on the text input
     */
    public async searchIngredients(searchText: string): Promise<IDBIngredient[]> {
        try {
            if (!searchText) {
                throw new Error("Invalid request");
            }
            const res = await this.baseRequest<IDBIngredient[]>("search", {
                i: searchText
            });
            const data = res.data;
            if (data && data.ingredients) {
                return data.ingredients;
            } else {
                throw new Error("Invalid response");
            }
        } catch (err) {
            return [];
        }
    }
}
