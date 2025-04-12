import { prisma } from "../prisma.js";
import fs from "fs";
import { cloudinary } from "../cloudinary.js";

const uploadFilePage = async (req, res) => {
  try {
    const foldersName = await prisma.folder.findMany({
      where: {
        userId: req.user.id,
      },
      select: {
        name: true,
      },
    });
    res.render("uploadFile", { foldersName });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Failed to fetch all folders" });
  }
};

const uploadFile = async (req, res) => {
  if (!req.file) {
    console.error("❌ No file uploaded!");
    req.flash("error", "❌ No file uploaded! Please try again.");
    return res.redirect("/upload-file");
  }

  let localFilePath;
  try {
    localFilePath = req.file.path;
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
        folderId: folderId || null,
      },
    });

    // 4. Delete local file after uploading
    fs.unlinkSync(localFilePath);

    req.flash("success", "✅ File uploaded successfully!");
    res.redirect("/upload-file");
  } catch (err) {
    if (localFilePath) {
      console.log(localFilePath);
      fs.unlinkSync(localFilePath);
    }
    console.error("❌ Upload failed:", err);
    req.flash("error", "❌ File upload failed! Try again later");
    res.redirect("/upload-file");
  }
};

export { uploadFilePage, uploadFile };
