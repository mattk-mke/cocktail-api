import { IIngredientStub } from "../../src/shared/interfaces/cocktail.interface";
import { IDBCocktail, IDBIngredient } from "../../src/shared/interfaces/thecocktaildb.interface";
import { ConverterService } from "../../src/shared/services/converter.service";
import { testDBCocktail } from "../data/testdata";

const service = new ConverterService();

describe("Converter Service", () => {
    describe("convertCocktail()", () => {
        const pisco: IDBCocktail = testDBCocktail;

        const convertedPisco = service.convertCocktail(pisco);

        it("Should parse all instructions", () => {
            expect(Object.keys(convertedPisco.instructions).length).toEqual(7);
            expect(convertedPisco.instructions["EN"]).toEqual(pisco.strInstructions as string);
        });

        it("Should parse all ingredients", () => {
            expect(convertedPisco.ingredients.length).toEqual(5);
            expect(convertedPisco.ingredients[0]).toEqual({
                name: pisco.strIngredient1,
                measurement: pisco.strMeasure1
            } as IIngredientStub);
        });
    });

    describe("convertIngredient()", () => {
        const pisco: IDBIngredient = {
            idIngredient: "400",
            strIngredient: "Pisco",
            strDescription:
                "Pisco is a colorless or yellowish-to-amber colored brandy produced in winemaking regions of Peru and Chile. Made by distilling fermented grape juice into a high-proof spirit, it was developed by 16th century Spanish settlers as an alternative to orujo, a pomace brandy that was being imported from Spain. It had the advantages of being produced from abundant domestically grown fruit and reducing the volume of alcoholic beverages transported to remote locations.\r\n\r\nAnnual pisco production in 2013 reached 30 million litres in Chile and 9.5 million litres in Peru. Chile is also the main importer of Pisco from Peru: 34% of the Pisco produced in Peru is exported to Chile.",
            strType: "Brandy",
            strAlcohol: "Yes",
            strABV: null
        };

        const convertedPisco = service.convertIngredient(pisco);

        it("Should retain all ingredient data", () => {
            expect(convertedPisco.id).toEqual(pisco.idIngredient);
            expect(convertedPisco.name).toEqual(pisco.strIngredient);
            expect(convertedPisco.description).toEqual(pisco.strDescription);
            expect(convertedPisco.type).toEqual(pisco.strType);
            expect(convertedPisco.isAlcohol).toEqual(true);
        });
    });
});
