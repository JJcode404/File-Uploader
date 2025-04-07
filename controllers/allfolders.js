import { prisma } from "../seeding.js";

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

export { allfolderPage };
