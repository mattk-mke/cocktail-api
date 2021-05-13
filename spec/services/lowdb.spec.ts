import { ICocktail } from "../../src/shared/interfaces/cocktail.interface";
import { LowDBService } from "../../src/shared/services/lowdb.service";
import { testCocktail } from "../data/testdata";

describe("LowDB Service", () => {
    let service: LowDBService;

    beforeEach(() => {
        service = new LowDBService();
        service.db
            .set("cocktails", [])
            .set("ingredients", [])
            .set("counts", {
                ingredients: 0,
                cocktails: 0
            })
            .write();
    });

    describe("getCollection()", () => {
        it("Should return default empty collections on first run", () => {
            expect(service.getCollection("cocktails").length).toEqual(0);
        });
    });

    describe("addToCollection()", () => {
        it("Should add an item to the collection", () => {
            expect(service.getCollection("cocktails").length).toEqual(0);
            const trinidad: ICocktail = testCocktail;
            service.addToCollection<ICocktail>("cocktails", trinidad);
            expect(service.getCollection("cocktails").length).toEqual(1);
        });
    });

    describe("removeFromCollection()", () => {
        it("Should remove an item from the collection", () => {
            const trinidad: ICocktail = testCocktail;
            const newItem = service.addToCollection<ICocktail>("cocktails", trinidad);
            expect(service.getCollection("cocktails").length).toEqual(1);
            service.removeFromCollection("cocktails", newItem.id);
            expect(service.getCollection("cocktails").length).toEqual(0);
        });
    });
});
