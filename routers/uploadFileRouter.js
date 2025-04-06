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
    console.log(localFilePath);

    // 1. Upload to Cloudinary
    const result = await cloudinary.uploader.upload(localFilePath, {
      folder: "myapp_files",
      timeout: 80000,
    });
    console.log(result.secure_url);

    // 2. Save file info to database
    const file = await prisma.file.create({
      data: {
        userId: req.user.id, // assuming you're using auth middleware
        fileName: req.file.originalname,
        filePath: result.secure_url, // cloud URL
        fileType: req.file.mimetype,
        fileSize: req.file.size,
      },
    });

    // 3. Delete local file
    fs.unlinkSync(localFilePath);

    res.status(201).json({ message: "File uploaded!", file });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong while uploading." });
  }
});

export { uploadFileRouter };
