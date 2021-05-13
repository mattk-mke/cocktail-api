import { FilterParam } from "../../src/shared/interfaces/thecocktaildb.interface";
import { CocktailDBService } from "../../src/shared/services/thecocktaildb.service";

const service = new CocktailDBService();

describe("filterDrinks()", () => {
    it("Should return an array containing results", done => {
        service.filterDrinks(FilterParam.Ingredient, "Pisco").then(data => {
            expect(data).toEqual(jasmine.arrayContaining([]));
            const pisco = data.find(d => d.strDrink === "Pisco Sour");
            expect(pisco).toBeTruthy();
            done();
        });
    });

    it("Should return an empty array when the value is missing", done => {
        service.filterDrinks(FilterParam.Ingredient, "").then(data => {
            expect(data).toEqual([]);
            done();
        });
    });

    it("Should return an empty array when the ingredient is invalid", done => {
        service.filterDrinks(FilterParam.Ingredient, "Posco").then(data => {
            expect(data).toEqual([]);
            done();
        });
    });
});

describe("searchCocktails()", () => {
    it("Should return an array containing results", done => {
        service.searchCocktails("Pisco").then(data => {
            expect(data).toEqual(jasmine.arrayContaining([]));
            const pisco = data.find(d => d.strDrink === "Pisco Sour");
            expect(pisco).toBeDefined();
            done();
        });
    });

    it("Should return an empty array when the searchText is missing", done => {
        service.searchCocktails("").then(data => {
            expect(data).toEqual([]);
            done();
        });
    });
});

describe("searchIngredients()", () => {
    it("Should return an array containing results", done => {
        service.searchIngredients("Pisco").then(data => {
            expect(data).toEqual(jasmine.arrayContaining([]));
            const pisco = data.find(i => i.strIngredient === "Pisco");
            expect(pisco).toBeDefined();
            done();
        });
    });

    it("Should return an empty array when the searchText is missing", done => {
        service.searchIngredients("").then(data => {
            expect(data).toEqual([]);
            done();
        });
    });
});
