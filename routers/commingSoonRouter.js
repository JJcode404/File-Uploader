import { Router } from "express";
import { comingsoonPage } from "../controllers/commingsoon.js";

const commingSoonRouter = Router();
commingSoonRouter.get("/", comingsoonPage);

export { commingSoonRouter };
