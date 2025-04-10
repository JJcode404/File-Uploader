import { Router } from "express";
import { upload } from "../controllers/generalUpload.js";
import { uploadFilePage, uploadFile } from "../controllers/uploadfile.js";
import { validateFileUpload } from "../validators/validateFileupload.js";

const uploadFileRouter = Router();
uploadFileRouter.get("/", uploadFilePage);
uploadFileRouter.post(
  "/",
  upload.single("file"),
  validateFileUpload,
  uploadFile
);

export { uploadFileRouter };
