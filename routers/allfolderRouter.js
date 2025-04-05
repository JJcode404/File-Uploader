import { Router } from "express";
import { allfolderPage } from "../controllers/allfolders.js";

const allfolderRouter = Router();
allfolderRouter.get("/", allfolderPage);

export { allfolderRouter };
