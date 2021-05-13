const baseUrl: string = "http://localhost:3000/cocktails";
import axios from "axios";
import { IPaginatedResponse } from "../../src/shared/interfaces/api.interface";
import { ICocktail } from "../../src/shared/interfaces/cocktail.interface";

describe("Cocktail Controller", () => {
    let server;
    beforeAll(() => {
        server = require("../../src/server.ts").server;
    });
    afterAll(() => {
        server.close();
    });

    describe("GET /cocktails", () => {
        it("Should return a valid response", done => {
            axios
                .get<IPaginatedResponse<ICocktail>>(baseUrl, { responseType: "json" })
                .then(res => {
                    expect(res.data).toBeDefined();
                    expect(res.data.data).toBeDefined();
                    expect(res.data.hasMore).toBeDefined();
                    expect(res.data.totalCount).toBeDefined();
                    done();
                })
                .catch(err => {
                    expect(err).toBeNull();
                    done();
                });
        });

        it("Should limit results to the specified pageSize", done => {
            const pageSize = 5;
            axios
                .get<IPaginatedResponse<ICocktail>>(baseUrl, {
                    responseType: "json",
                    params: {
                        pageSize,
                        name: "a"
                    }
                })
                .then(res => {
                    expect(res.data.data.length).toEqual(pageSize);
                    expect(res.data.totalCount).toBeGreaterThan(pageSize);
                    done();
                })
                .catch(err => {
                    expect(err).toBeNull();
                    done();
                });
        });
    });
});
