import { Router } from "express";
import { uploadFolderPage } from "../controllers/uploadFolder.js";
import { prisma } from "../seeding.js";
const uploadFolderRouter = Router();
uploadFolderRouter.get("/", uploadFolderPage);
uploadFolderRouter.post("/", async (req, res) => {
  try {
    const { folderName } = req.body;

    const folder = await prisma.folder.create({
      data: {
        userId: req.user.id,
        name: folderName,
      },
    });

    req.flash("success", "✅ Folder uploaded successfully!");
    res.redirect("/upload-folder");
  } catch (error) {
    console.error("❌ Failed to create folder:", error.message);
    return res
      .status(500)
      .json({ error: "Server error. Failed to create folder." });
  }
});

export { uploadFolderRouter };
