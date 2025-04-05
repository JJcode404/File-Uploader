import { Router } from "express";
import { uploadFilePage } from "../controllers/uploadfile.js";
const uploadFileRouter = Router();
uploadFileRouter.get("/", uploadFilePage);

export { uploadFileRouter };
