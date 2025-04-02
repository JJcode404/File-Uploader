import { Router } from "express";
import { homePage } from "../controllers/index.js";

const homeRouter = Router();
homeRouter.get("/", homePage);

export { homeRouter };
