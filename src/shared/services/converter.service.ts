import { ICocktail, IIngredient, IIngredientStub } from "../interfaces/cocktail.interface";
import { IDBCocktail, IDBIngredient } from "../interfaces/thecocktaildb.interface";

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
            dateModified: new Date(dbCocktail.dateModified).toISOString(), // convert to standard iso
            name: dbCocktail.strDrink,
            nameAlternate: dbCocktail.strDrinkAlternate,
            tags: dbCocktail.strTags ? dbCocktail.strTags.split(",") : [],
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

    /**
     * Converts the raw ingredient data from thecocktaildb api into a more useful format
     */
    public convertIngredient(dbIngredient: IDBIngredient): IIngredient {
        return {
            id: dbIngredient.idIngredient,
            name: dbIngredient.strIngredient,
            description: dbIngredient.strDescription,
            type: dbIngredient.strType,
            isAlcohol: dbIngredient.strAlcohol === "Yes",
            abv: dbIngredient.strABV !== null ? +dbIngredient.strABV : null,
            dateModified: null
        };
    }
}
