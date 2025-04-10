import { prisma } from "../prisma.js";
import { cloudinary } from "../cloudinary.js";

const homePage = async (req, res) => {
  try {
    if (req.user) {
      const totalFiles = await prisma.file.count({
        where: {
          userId: req.user.id,
        },
      });
      const totalFolders = await prisma.folder.count({
        where: {
          userId: req.user.id,
        },
      });

      // const usage = await cloudinary.api.usage();
      res.render("index", { totalFiles, totalFolders });
    } else {
      // User is not logged in, render the home page
      res.render("home");
    }
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving page",
      error: error.message,
    });
  }
};

const getCloudinaryUsage = async (req, res) => {
  try {
    const usage = await cloudinary.api.usage({ timeout: 26000 });

    res.json({ spaceUsed: usage.storage.usage });
  } catch (error) {
    res.status(404).json({ error: "Failed to fetch Cloudinary usage" });
  }
};

export { homePage, getCloudinaryUsage };
