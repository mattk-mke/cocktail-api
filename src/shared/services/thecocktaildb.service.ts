import axios from "axios";
import {
    FilterParam,
    ICocktailDBResponse,
    IDBCocktailStub
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
}
