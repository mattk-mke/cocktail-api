import { ICocktail } from "../../src/shared/interfaces/cocktail.interface";
import { AlcoholOption, IDBCocktail } from "../../src/shared/interfaces/thecocktaildb.interface";

export const testDBCocktail: IDBCocktail = {
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

export const testCocktail: ICocktail = {
    name: "Trinidad Sour",
    nameAlternate: null,
    tags: [],
    videoUrl: null,
    category: "Cocktail",
    iba: null,
    alcoholOption: AlcoholOption.Alcoholic,
    glassType: "Cocktail Glass",
    instructions: {
        EN: "Combine ingredients in a shaker and fill with ice. Shake well to chill; strain into a chilled glass."
    },
    imageUrl: null,
    imageSrc: null,
    imageAttribution: null,
    isCreativeCommonsConfirmed: false,
    ingredients: [
        {
            name: "ANGOSTURA BITTERS",
            measurement: "1 oz"
        },
        {
            name: "ORGEAT",
            measurement: "1 oz"
        },
        {
            name: "FRESH LEMON JUICE",
            measurement: "3/4 oz"
        },
        {
            name: "RYE WHISKEY",
            measurement: "1/2 oz"
        }
    ]
};
