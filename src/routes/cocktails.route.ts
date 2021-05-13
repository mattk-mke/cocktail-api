import express, { Router } from "express";
import cocktailsController from "../controllers/cocktails.controller";

const router: Router = express.Router();

router.get("/cocktails", cocktailsController.getCocktails);

export default router;
