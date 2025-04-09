import { Router } from "express";
import { upload } from "../controllers/generalUpload.js";
import { prisma } from "../seeding.js";
import fs from "fs";
import { cloudinary } from "../cloudinary.js";
import { uploadFilePage } from "../controllers/uploadfile.js";
import { validateFileUpload } from "../validators/validateFileupload.js";

const uploadFileRouter = Router();
uploadFileRouter.get("/", uploadFilePage);
uploadFileRouter.post(
  "/",
  upload.single("file"),
  validateFileUpload,
  async (req, res) => {
    try {
      const localFilePath = req.file.path;
      const { folderName } = req.body;
      const userId = req.user.id;

      // 1. Upload to Cloudinary
      const result = await cloudinary.uploader.upload(localFilePath, {
        folder: "myapp_files",
        timeout: 26000,
      });

      console.log("☁️ Cloudinary URL:", result.secure_url);
      let folderId = undefined;
      if (folderName) {
        const folder = await prisma.folder.findFirst({
          where: {
            name: folderName,
            userId,
          },
        });

        if (folder) {
          folderId = folder.id; // Get the folder's ID
        }
      }
      // 3. Save file to database
      const file = await prisma.file.create({
        data: {
          userId,
          fileName: req.file.originalname,
          filePath: result.secure_url,
          fileType: req.file.mimetype,
          fileSize: req.file.size,
          folderId: folderId,
        },
      });

      // 4. Delete local file after uploading
      fs.unlinkSync(localFilePath);

      req.flash("success", "✅ File uploaded successfully!");
      res.redirect("/upload-file");
    } catch (err) {
      fs.unlinkSync(localFilePath);
      console.error("❌ Upload failed:", err);
      req.flash("error", "❌ File uploaded failed! try again later");
      res.redirect("/upload-file");
    }
  }
);

export { uploadFileRouter };
