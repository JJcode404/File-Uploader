import { prisma } from "../seeding.js";

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

export { allfilesPage };
