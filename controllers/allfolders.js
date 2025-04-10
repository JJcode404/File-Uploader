import { prisma } from "../prisma.js";

const allfolderPage = async (req, res) => {
  try {
    const folders = await prisma.folder.findMany({
      where: {
        userId: req.user.id,
      },
    });
    res.render("allfolders", { folders });
  } catch (error) {
    res.status(404).json({ error: "Failed to fetch all folders" });
  }
};

const deleteFolder = async (req, res) => {
  try {
    const folderId = req.params.id;

    const file = await prisma.folder.findUnique({
      where: { id: folderId },
    });

    if (!file || file.userId !== req.user.id) {
      req.flash("error", "❌ Not authorized to download this file!");
      res.redirect("/folders");
    }

    await prisma.folder.delete({
      where: { id: folderId },
    });

    req.flash("success", "✅ Folder deleted successfully!");
    res.redirect("/folders");
  } catch (error) {
    console.error("❌ Upload failed:", err);
    req.flash("error", "❌ Folder deletion failed!");
    res.redirect("/folders");
  }
};
const viewFolderFiles = async (req, res) => {
  try {
    const folderId = req.params.id;
    const files = await prisma.file.findMany({
      where: {
        folderId: folderId,
      },
    });
    res.render("allfiles", { files });
  } catch (error) {
    console.error("❌ Upload failed:", err);
    req.flash("error", "❌ Folder deletion failed!");
    res.redirect("/folders");
  }
};

export { allfolderPage, deleteFolder, viewFolderFiles };
