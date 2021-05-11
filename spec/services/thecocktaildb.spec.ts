import { CocktailDBService } from "../../src/shared/services/thecocktaildb.service";

const service = new CocktailDBService();

describe("filterByIngredient()", () => {
    it("Should return an array", done => {
        service.filterByIngredient("Pisco").then(data => {
            expect(data).toEqual(jasmine.arrayContaining([]));
            done();
        });
    });

    it("Should return an empty array when the ingredient is invalid", done => {
        service.filterByIngredient("Posco").then(data => {
            expect(data).toEqual([]);
            done();
        });
    });
});
