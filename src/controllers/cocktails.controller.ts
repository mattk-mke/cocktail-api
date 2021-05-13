import { NextFunction, Request, Response } from "express";
import { handleError } from "../classes/error.class";
import { ICocktail, ICocktailQuery } from "../shared/interfaces/cocktail.interface";
import {
    AlcoholOption,
    FilterParam,
    IDBCocktailStub
} from "../shared/interfaces/thecocktaildb.interface";
import { ConverterService } from "../shared/services/converter.service";
import { LowDBService } from "../shared/services/lowdb.service";
import { CocktailDBService } from "../shared/services/thecocktaildb.service";

const cdb = new CocktailDBService();
const lowdb = new LowDBService();
const converter = new ConverterService();

export default {
    /**
     * Aggregates cocktail data from both thecocktaildb and local database
     * Acceptable query parameters:
     *  - name
     *  - alcoholOption
     *  - categories (comma-separated)
     *  - ingredients (comma-separated)
     */
    async getCocktails(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, alcoholOption, categories, ingredients } = req.query;

            const query: ICocktailQuery = {
                name: name as string,
                alcoholOption: alcoholOption as AlcoholOption,
                categories: categories ? (categories as string).split(",") : null,
                ingredients: ingredients ? (ingredients as string).split(",") : null
            };

            // const pageSize = Math.max(+(req.query.pageSize || 20), 0);
            // const page = Math.max(+(req.query.page || 1), 0);
            // const offset = Math.max((page - 1) * pageSize, 0);

            const localCocktails = lowdb.getCollection<ICocktail>("cocktails").filter(cocktail => {
                if (query.name) {
                    const normalizedName = query.name.toLowerCase();
                    if (!cocktail.name.toLowerCase().includes(normalizedName)) {
                        return false;
                    }
                }
                if (query.alcoholOption) {
                    const normalizedOption = query.alcoholOption.toLowerCase();
                    if (cocktail.alcoholOption.toLowerCase() !== normalizedOption) {
                        return false;
                    }
                }
                if (query.categories) {
                    if (
                        !query.categories.find(category => {
                            const normalizedCategory = category.toLowerCase();
                            return cocktail.category.toLowerCase() === normalizedCategory;
                        })
                    ) {
                        return false;
                    }
                }
                if (query.ingredients) {
                    const ingredients = cocktail.ingredients.map(i => i.name.toLowerCase());
                    if (
                        !query.ingredients.every(ingredient => {
                            const normalizedIngredient = ingredient.toLowerCase();
                            return ingredients.includes(normalizedIngredient);
                        })
                    ) {
                        return false;
                    }
                }
            });

            let isFiltered: boolean = false;
            let dbCocktails: ICocktail[] = [];
            let dbCocktailStubs: IDBCocktailStub[] = [];
            let results: ICocktail[] = [];

            if (query.name) {
                const nameResults = await cdb.searchCocktails(query.name);
                dbCocktails = nameResults.map(result => converter.convertCocktail(result));
                isFiltered = true;
            }
            if (query.ingredients) {
                let ingredientResults: IDBCocktailStub[] = [];
                let index = 0;
                for (const ingredient of query.ingredients) {
                    const dbResults = await cdb.filterCocktails(FilterParam.Ingredient, ingredient);
                    if (index > 0) {
                        ingredientResults = ingredientResults.filter(
                            i => !!dbResults.find(d => d.idDrink === i.idDrink)
                        );
                    } else {
                        ingredientResults = ingredientResults.concat(dbResults);
                    }
                    index++;
                }
                if (isFiltered) {
                    dbCocktails = dbCocktails.filter(
                        d => !!ingredientResults.find(i => i.idDrink === d.id)
                    );
                } else {
                    dbCocktailStubs = ingredientResults;
                }
                isFiltered = true;
            }
            if (query.alcoholOption) {
                const alcoholResults = await cdb.filterCocktails(
                    FilterParam.Alcohol,
                    query.alcoholOption
                );
                if (isFiltered) {
                    dbCocktails = dbCocktails.filter(
                        c => !!alcoholResults.find(r => r.idDrink === c.id)
                    );

                    dbCocktailStubs = dbCocktailStubs.filter(
                        c => !!alcoholResults.find(r => r.idDrink === c.idDrink)
                    );
                } else {
                    dbCocktailStubs = alcoholResults;
                }
                isFiltered = true;
            }
            if (query.categories) {
                let allCategoryResults: IDBCocktailStub[] = [];
                let index = 0;
                for (const category of query.categories) {
                    const dbResults = await cdb.filterCocktails(FilterParam.Category, category);
                    if (index > 0) {
                        allCategoryResults = allCategoryResults.filter(
                            i => !!dbResults.find(d => d.idDrink === i.idDrink)
                        );
                    } else {
                        allCategoryResults = allCategoryResults.concat(dbResults);
                    }
                    index++;
                }
                if (isFiltered) {
                    dbCocktails = dbCocktails.filter(
                        d => !!allCategoryResults.find(i => i.idDrink === d.id)
                    );
                    dbCocktailStubs = dbCocktailStubs.filter(
                        c => !!allCategoryResults.find(r => r.idDrink === c.idDrink)
                    );
                } else {
                    dbCocktailStubs = allCategoryResults;
                }
                isFiltered = true;
            }

            // Hydrate full cocktail data from stub data
            const hydratedDBCocktails = await Promise.all(
                dbCocktailStubs.map(s => cdb.getCocktailById(s.idDrink))
            );
            const hydratedCocktails = hydratedDBCocktails
                .filter(c => !!c)
                // @ts-ignore
                .map(c => converter.convertCocktail(c));

            results = dbCocktails
                .concat(hydratedCocktails)
                .concat(localCocktails)
                .sort((a, b) => (a.name > b.name ? 1 : -1));
            return res.send(results);
        } catch (err) {
            return handleError(res, err);
        }
    }
};