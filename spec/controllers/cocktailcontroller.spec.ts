const baseUrl: string = `http://localhost:${process.env.PORT || 3001}/cocktails`;
import axios, { AxiosError } from "axios";
import fs from "fs";
import { IPaginatedResponse } from "../../src/shared/interfaces/api.interface";
import { ICocktail } from "../../src/shared/interfaces/cocktail.interface";
import { testCocktail } from "../data/testdata";

function resetDB() {
    if (process.env.DB_PATH && fs.existsSync(process.env.DB_PATH)) {
        fs.unlinkSync(process.env.DB_PATH);
    }
}

describe("Cocktail Controller", () => {
    let server;
    beforeAll(() => {
        server = require("../../src/server.ts").server;
    });
    afterAll(() => {
        server.close();
    });

    describe("GET /cocktails", () => {
        afterEach(resetDB);

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
        afterEach(resetDB);

        it("Should return 404 if the ID is not found", done => {
            axios
                .get<ICocktail>(baseUrl + "/123fakeid", {
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

    describe("POST /cocktails", () => {
        afterEach(resetDB);

        it("Should create a new cocktail in the local database", done => {
            axios
                .get<IPaginatedResponse<ICocktail>>(baseUrl, {
                    responseType: "json",
                    params: {
                        name: "Trinidad Sour"
                    }
                })
                .then(res => {
                    expect(res.data.data.length).toEqual(0);
                    const trinidad = testCocktail;
                    const body = {
                        cocktail: trinidad
                    };
                    axios
                        .post<ICocktail>(baseUrl, body, {
                            responseType: "json"
                        })
                        .then(res => {
                            expect(res.status).toBe(201);
                            expect(res.data).toBeDefined();
                            expect(res.data.id).toBeDefined();
                            expect(res.data.name).toEqual(trinidad.name);
                            done();
                        })
                        .catch((err: AxiosError) => {
                            expect(err).toBeNull();
                            done();
                        });
                })
                .catch(err => {
                    expect(err).toBeNull();
                    done();
                });
        });
    });

    describe("PUT /cocktails/:cocktailId", () => {
        afterEach(resetDB);

        it("Should update a cocktail in the local database", done => {
            const trinidad = testCocktail;
            const body = {
                cocktail: trinidad
            };
            axios
                .post<ICocktail>(baseUrl, body, {
                    responseType: "json"
                })
                .then(res => {
                    expect(res.status).toBe(201);
                    const newCocktail = res.data;
                    expect(newCocktail.name).toEqual(trinidad.name);
                    const updatedBody = {
                        cocktail: { ...trinidad, name: "Best Trinidad" }
                    };
                    axios
                        .put<ICocktail>(`${baseUrl}/${newCocktail.id}`, updatedBody, {
                            responseType: "json"
                        })
                        .then(res => {
                            expect(res.status).toBe(200);
                            expect(res.data).toBeDefined();
                            expect(res.data.id).toEqual(newCocktail.id);
                            expect(res.data.name).toEqual("Best Trinidad");
                            done();
                        })
                        .catch((err: AxiosError) => {
                            expect(err).toBeNull();
                            done();
                        });
                })
                .catch((err: AxiosError) => {
                    expect(err).toBeNull();
                    done();
                });
        });
    });
});
