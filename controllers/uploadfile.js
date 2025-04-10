import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

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
  } finally {
    await prisma.$disconnect();
  }
};

export { uploadFilePage };
