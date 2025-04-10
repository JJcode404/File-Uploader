import { Router } from "express";
import { uploadFolderPage, uploadFolder } from "../controllers/uploadFolder.js";

const uploadFolderRouter = Router();
uploadFolderRouter.get("/", uploadFolderPage);
uploadFolderRouter.post("/", uploadFolder);

export { uploadFolderRouter };
