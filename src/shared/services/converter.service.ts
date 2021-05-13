import { ICocktail, IIngredientStub } from "../interfaces/cocktail.interface";
import { IDBCocktail } from "../interfaces/thecocktaildb.interface";

export class ConverterService {
    /**
     * Converts the raw cocktail data from thecocktaildb api into a more useful format
     */
    public convertCocktail(dbCocktail: IDBCocktail): ICocktail {
        const instructions = {};
        const ingredients: IIngredientStub[] = [];
        Object.keys(dbCocktail).forEach(key => {
            // Build instructions per language
            if (key.includes("strInstructions")) {
                const language = key.slice(15) || "EN";
                instructions[language] = dbCocktail[key];
            }

            // Build ingredients array
            if (key.includes("strIngredient") && dbCocktail[key]) {
                const index = key.slice(13);
                ingredients[+index - 1] = {
                    name: dbCocktail["strIngredient" + index],
                    measurement: dbCocktail["strMeasure" + index]
                };
            }
        });

        return {
            id: dbCocktail.idDrink,
            dateModified: new Date(dbCocktail.dateModified).toISOString(),
            name: dbCocktail.strDrink,
            nameAlternate: dbCocktail.strDrinkAlternate,
            tags: (dbCocktail.strTags || "").split(","),
            videoUrl: dbCocktail.strVideo,
            category: dbCocktail.strCategory,
            iba: dbCocktail.strIBA,
            alcoholOption: dbCocktail.strAlcoholic,
            glassType: dbCocktail.strGlass,
            instructions,
            imageUrl: dbCocktail.strDrinkThumb,
            imageSrc: dbCocktail.strImageSource,
            imageAttribution: dbCocktail.strImageAttribution,
            isCreativeCommonsConfirmed: dbCocktail.strCreativeCommonsConfirmed === "Yes",
            ingredients
        };
    }
}
