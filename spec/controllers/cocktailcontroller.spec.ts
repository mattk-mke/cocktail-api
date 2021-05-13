const baseUrl: string = "http://localhost:3000/cocktails";
import axios, { AxiosError } from "axios";
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
                    expect(res.status).toBe(200);
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
                    expect(res.status).toBe(200);
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

    describe("GET /cocktails/:cocktailId", () => {
        it("Should return 404 if the ID is not found", done => {
            axios
                .get<IPaginatedResponse<ICocktail>>(baseUrl + "/123fakeid", {
                    responseType: "json"
                })
                .then(res => {
                    expect(res.status).toBe(404);
                    expect(res.data).toBeNull();
                    done();
                })
                .catch((err: AxiosError) => {
                    expect(err.response?.status).toBe(404);
                    done();
                });
        });

        it("Should return a valid if the ID is not found", done => {
            const cocktailId = "13214";
            axios
                .get<ICocktail>(`${baseUrl}/${cocktailId}`, {
                    responseType: "json"
                })
                .then(res => {
                    expect(res.status).toBe(200);
                    expect(res.data).toBeDefined();
                    expect(res.data.id).toEqual(cocktailId);
                    expect(res.data.name).toEqual("Pisco Sour");
                    done();
                })
                .catch((err: AxiosError) => {
                    expect(err).toBeNull();
                    done();
                });
        });
    });
});
