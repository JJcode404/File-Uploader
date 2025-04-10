import { prisma } from "../prisma.js";

const uploadFolderPage = (req, res) => {
  res.render("uploadFolder");
};

const uploadFolder = async (req, res) => {
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
};
export { uploadFolderPage, uploadFolder };
