# Cocktail Aggregation API

## Summary

RESTful wrapper API for aggregating cocktails from [thecocktaildb](https://www.thecocktaildb.com/api.php) as well as user-created drinks that are stored in a local JSON database.

## Usage

`npm install`

### Testing

`npm test`

### Serve

`npm start`

Specify `PORT` environment variable to override default of `3000`

### Debug

`npm run debug`

Attach debugger to node process

## Routes

### GET `/cocktails`

Returns paginated results of cocktails that match the search criteria, sorted alphabetically by name

Acceptable Query Parameters:

-   `name` Text Search name
-   `alcoholOption` (Non_Alcoholic or Alcoholic)
-   `categories` (comma-separated)
-   `ingredients` (comma-separated)
-   `pageSize` Limit results, default of 20
-   `page` Specify page number

Response:

```json
{
    "data": [
        // collection of cocktail results
        {
            "id": "13214",
            "dateModified": "2015-08-18T20:20:22.000Z",
            "name": "Pisco Sour",
            "nameAlternate": null,
            "tags": ["IBA", "NewEra"],
            "videoUrl": null,
            "category": "Cocktail",
            "iba": "New Era Drinks",
            "alcoholOption": "Alcoholic",
            "glassType": "Cocktail glass",
            "instructions": {
                "EN": "Vigorously shake and strain contents in a cocktail shaker with ice cubes, then pour into glass and garnish with bitters.\r\n",
                "ES": null,
                "DE": "Den Inhalt in einem Cocktailshaker mit Eiswürfeln kräftig schütteln und abseihen, dann in ein Glas gießen und mit Bitter garnieren.",
                "FR": null,
                "IT": "Shakerare vigorosamente e filtrare il contenuto in uno shaker con cubetti di ghiaccio, quindi versare in un bicchiere e guarnire con bitter.",
                "ZH-HANS": null,
                "ZH-HANT": null
            },
            "imageUrl": "https://www.thecocktaildb.com/images/media/drink/tsssur1439907622.jpg",
            "imageSrc": null,
            "imageAttribution": null,
            "isCreativeCommonsConfirmed": false,
            "ingredients": [
                {
                    "name": "Pisco",
                    "measurement": "2 oz "
                },
                {
                    "name": "Lemon juice",
                    "measurement": "1 oz "
                },
                {
                    "name": "Sugar",
                    "measurement": "1-2 tblsp "
                },
                {
                    "name": "Ice",
                    "measurement": "1"
                },
                {
                    "name": "Egg White",
                    "measurement": null
                }
            ]
        }
    ],
    "hasMore": false, // Has more pages?
    "totalCount": 0 // Total count
}
```

### GET `/cocktails/:cocktailId`

Returns data for the specified cocktail

Response:

```json
{
    "id": "13214",
    "dateModified": "2015-08-18T20:20:22.000Z",
    "name": "Pisco Sour",
    "nameAlternate": null,
    "tags": ["IBA", "NewEra"],
    "videoUrl": null,
    "category": "Cocktail",
    "iba": "New Era Drinks",
    "alcoholOption": "Alcoholic",
    "glassType": "Cocktail glass",
    "instructions": {
        "EN": "Vigorously shake and strain contents in a cocktail shaker with ice cubes, then pour into glass and garnish with bitters.\r\n",
        "ES": null,
        "DE": "Den Inhalt in einem Cocktailshaker mit Eiswürfeln kräftig schütteln und abseihen, dann in ein Glas gießen und mit Bitter garnieren.",
        "FR": null,
        "IT": "Shakerare vigorosamente e filtrare il contenuto in uno shaker con cubetti di ghiaccio, quindi versare in un bicchiere e guarnire con bitter.",
        "ZH-HANS": null,
        "ZH-HANT": null
    },
    "imageUrl": "https://www.thecocktaildb.com/images/media/drink/tsssur1439907622.jpg",
    "imageSrc": null,
    "imageAttribution": null,
    "isCreativeCommonsConfirmed": false,
    "ingredients": [
        {
            "name": "Pisco",
            "measurement": "2 oz "
        },
        {
            "name": "Lemon juice",
            "measurement": "1 oz "
        },
        {
            "name": "Sugar",
            "measurement": "1-2 tblsp "
        },
        {
            "name": "Ice",
            "measurement": "1"
        },
        {
            "name": "Egg White",
            "measurement": null
        }
    ]
}
```

### POST `/cocktails`

Creates a new cocktail and stores it in the local JSON database. Follows the same model as the GET requests

Returns the created cocktail with a new ID

### PUT `/cocktails/:cocktailId`

Updates a cocktail in the local JSON database, given the ID

Returns the updated cocktail data

### DELETE `/cocktails/:cocktailId`

Removes a cocktail in the local JSON database
