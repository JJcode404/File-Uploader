import { Router } from "express";
import { homePage } from "../controllers/index.js";
import { getCloudinaryUsage } from "../controllers/index.js";

const homeRouter = Router();
homeRouter.get("/", homePage);
homeRouter.get("/api/space-used", getCloudinaryUsage);

export { homeRouter };
