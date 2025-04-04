import { Router } from "express";
import { allfilesPage } from "../controllers/allfiles.js";

const allfilesRouter = Router();
allfilesRouter.get("/", allfilesPage);

export { allfilesRouter };
