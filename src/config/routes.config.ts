import express from "express";
import cocktailRoutes from "../routes/cocktails.route";

export default {
    init(app: express.Application) {
        app.use(cocktailRoutes);
    }
};
