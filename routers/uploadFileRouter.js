import { Router } from "express";
import { upload } from "../controllers/generalUpload.js";
import { prisma } from "../seeding.js";
import fs from "fs";
import { cloudinary } from "../cloudinary.js";
import { uploadFilePage } from "../controllers/uploadfile.js";

const uploadFileRouter = Router();
uploadFileRouter.get("/", uploadFilePage);
uploadFileRouter.post("/", upload.single("file"), async (req, res) => {
  try {
    const localFilePath = req.file.path;
    const { folderName } = req.body;
    const userId = req.user.id;

    // 1. Upload to Cloudinary
    const result = await cloudinary.uploader.upload(localFilePath, {
      folder: "myapp_files",
      timeout: 80000,
    });

    // console.log("☁️ Cloudinary URL:", result.secure_url);
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

    res.status(201).json({ message: "✅ File uploaded!", file });
  } catch (err) {
    console.error("❌ Upload failed:", err);
    res.status(500).json({ error: "Something went wrong while uploading." });
  }
});

export { uploadFileRouter };
