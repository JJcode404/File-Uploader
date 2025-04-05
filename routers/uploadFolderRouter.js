import { Router } from "express";
import { uploadFolderPage } from "../controllers/uploadFolder.js";
const uploadFolderRouter = Router();
uploadFolderRouter.get("/", uploadFolderPage);

export { uploadFolderRouter };
