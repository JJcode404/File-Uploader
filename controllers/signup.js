import bcrypt, { compareSync } from "bcryptjs";
import { prisma } from "../prisma.js";

const singUppage = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  res.render("sign-up");
};

const postUserDetails = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const isEmailOnDatabase = await prisma.user.findFirst({
      where: {
        email: req.body.email,
      },
    });
    if (!isEmailOnDatabase) {
      const addUserToDb = await prisma.user.create({
        data: {
          name: req.body.fullname,
          email: req.body.email,
          password: hashedPassword,
        },
      });

      res.redirect("/");
    } else {
      return res.status(400).render("sign-up", {
        error: "Email already in use. Try logging in instead.",
        oldInput: req.body,
      });
    }
  } catch (error) {
    console.error("Error inserting user:", error);
    next(error);
  }
};

export { singUppage, postUserDetails };
