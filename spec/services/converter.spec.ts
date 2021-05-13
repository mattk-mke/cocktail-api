import { IIngredientStub } from "../../src/shared/interfaces/cocktail.interface";
import {
    AlcoholOption,
    IDBCocktail,
    IDBIngredient
} from "../../src/shared/interfaces/thecocktaildb.interface";
import { ConverterService } from "../../src/shared/services/converter.service";

const service = new ConverterService();

describe("Converter Service", () => {
    describe("convertCocktail()", () => {
        const pisco: IDBCocktail = {
            idDrink: "13214",
            strDrink: "Pisco Sour",
            strDrinkAlternate: null,
            strTags: "IBA,NewEra",
            strVideo: null,
            strCategory: "Cocktail",
            strIBA: "New Era Drinks",
            strAlcoholic: AlcoholOption.Alcoholic,
            strGlass: "Cocktail glass",
            strInstructions:
                "Vigorously shake and strain contents in a cocktail shaker with ice cubes, then pour into glass and garnish with bitters.\r\n",
            strInstructionsES: null,
            strInstructionsDE:
                "Den Inhalt in einem Cocktailshaker mit Eiswürfeln kräftig schütteln und abseihen, dann in ein Glas gießen und mit Bitter garnieren.",
            strInstructionsFR: null,
            strInstructionsIT:
                "Shakerare vigorosamente e filtrare il contenuto in uno shaker con cubetti di ghiaccio, quindi versare in un bicchiere e guarnire con bitter.",
            "strInstructionsZH-HANS": null,
            "strInstructionsZH-HANT": null,
            strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/tsssur1439907622.jpg",
            strIngredient1: "Pisco",
            strIngredient2: "Lemon juice",
            strIngredient3: "Sugar",
            strIngredient4: "Ice",
            strIngredient5: "Egg White",
            strIngredient6: null,
            strIngredient7: null,
            strIngredient8: null,
            strIngredient9: null,
            strIngredient10: null,
            strIngredient11: null,
            strIngredient12: null,
            strIngredient13: null,
            strIngredient14: null,
            strIngredient15: null,
            strMeasure1: "2 oz ",
            strMeasure2: "1 oz ",
            strMeasure3: "1-2 tblsp ",
            strMeasure4: "1",
            strMeasure5: null,
            strMeasure6: null,
            strMeasure7: null,
            strMeasure8: null,
            strMeasure9: null,
            strMeasure10: null,
            strMeasure11: null,
            strMeasure12: null,
            strMeasure13: null,
            strMeasure14: null,
            strMeasure15: null,
            strImageSource: null,
            strImageAttribution: null,
            strCreativeCommonsConfirmed: "No",
            dateModified: "2015-08-18 15:20:22"
        };

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
