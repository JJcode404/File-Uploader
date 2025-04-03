import bcrypt, { compareSync } from "bcryptjs";
import { prisma } from "../seeding.js";
const singUppage = (req, res) => {
  res.render("sign-up");
};

const postUserDetails = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const addUserToDb = await prisma.user.create({
      data: {
        name: req.body.fullname,
        email: req.body.email,
        password: hashedPassword,
      },
    });
    res.redirect("/login");
  } catch (error) {
    console.error("Error inserting user:", error);
    next(error);
  }
};

export { singUppage, postUserDetails };
