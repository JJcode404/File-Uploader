import { prisma } from "../prisma.js";
import path from "path";

const allfilesPage = async (req, res) => {
  try {
    const files = await prisma.file.findMany({
      where: {
        userId: req.user.id,
      },
    });

    res.render("allfiles", { files });
  } catch (error) {
    res.status(404).json({ error: "Failed to fetch all files" });
  }
};

const deleteFile = async (req, res) => {
  try {
    const fileId = req.params.id;

    const file = await prisma.file.findUnique({
      where: { id: fileId },
    });

    if (!file || file.userId !== req.user.id) {
      req.flash("error", "❌ Not authorized to download this file!");
      res.redirect("/files");
    }

    await prisma.file.delete({
      where: { id: fileId },
    });

    req.flash("success", "✅ File deleted successfully!");
    res.redirect("/files");
  } catch (error) {
    console.error("❌ Upload failed:", err);
    req.flash("error", "❌ File deletion failed!");
    res.redirect("/files");
  }
};

const downloadFile = async (req, res) => {
  try {
    const fileId = req.params.id;

    const file = await prisma.file.findUnique({
      where: { id: fileId },
    });

    if (file.userId !== req.user.id) {
      req.flash("error", "❌ Not authorized to download this file!");
      res.redirect("/files");
    }

    const downloadName = path.parse(file.fileName).name;

    const forceDownloadUrl = file.filePath.replace(
      "/upload/",
      `/upload/fl_attachment:${downloadName}/`
    );

    res.redirect(forceDownloadUrl);
  } catch (error) {
    req.flash("error", "❌ Failed to download file!");
    res.redirect("/files");
  }
};

export { allfilesPage, deleteFile, downloadFile };
