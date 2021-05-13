import express, { Router } from "express";
import cocktailsController from "../controllers/cocktails.controller";

const router: Router = express.Router();

router.get("/cocktails", cocktailsController.getCocktails);
router.post("/cocktails", cocktailsController.createCocktail);
router.get("/cocktails/:cocktailId", cocktailsController.getCocktail);
router.put("/cocktails/:cocktailId", cocktailsController.updateCocktail);
router.delete("/cocktails/:cocktailId", cocktailsController.deleteCocktail);

export default router;
