import { FilterParam } from "../../src/shared/interfaces/thecocktaildb.interface";
import { CocktailDBService } from "../../src/shared/services/thecocktaildb.service";

const service = new CocktailDBService();

describe("filterDrinks()", () => {
    it("Should return an array", done => {
        service.filterDrinks(FilterParam.Ingredient, "Pisco").then(data => {
            expect(data).toEqual(jasmine.arrayContaining([]));
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
