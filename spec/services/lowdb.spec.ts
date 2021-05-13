import { ICocktail } from "../../src/shared/interfaces/cocktail.interface";
import { testCocktail } from "../data/testdata";
import { LowDBServiceStub } from "./lowdb.stub";

describe("LowDB Service", () => {
    let service: LowDBServiceStub;

    beforeEach(() => {
        service = new LowDBServiceStub();
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
