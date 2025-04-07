import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import bcrypt from "bcryptjs";
import flash from "express-flash";
import expressSession from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { PrismaClient } from "@prisma/client";
import { prisma } from "./seeding.js";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { signRouter } from "./routers/signUpRouter.js";
import { loginRouter } from "./routers/loginRouter.js";
import { homeRouter } from "./routers/indexRouter.js";
import { commingSoonRouter } from "./routers/commingSoonRouter.js";
import { allfilesRouter } from "./routers/allfilesRouter.js";
import { allfolderRouter } from "./routers/allfolderRouter.js";
import { uploadFileRouter } from "./routers/uploadFileRouter.js";
import { uploadFolderRouter } from "./routers/uploadFolderRouter.js";
import { deleteFile, downloadFile } from "./controllers/allfiles.js";
import { deleteFolder, viewFolderFiles } from "./controllers/allfolders.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assetsPath = path.join(__dirname, "public");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(assetsPath));

app.use(
  expressSession({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    secret: "JJCODE404",
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);
app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await prisma.user.findFirst({
        where: {
          email: username,
        },
      });

      if (!user) {
        return done(null, false, { message: "Incorrect email" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: id,
      },
    });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use("/", homeRouter);
app.use("/sign-up", signRouter);
app.use("/login", loginRouter);
app.use("/comming-soon", commingSoonRouter);
app.use("/files", allfilesRouter);
app.use("/folders", allfolderRouter);
app.use("/upload-file", uploadFileRouter);
app.use("/upload-folder", uploadFolderRouter);
app.use("/delete-file/:id", deleteFile);
app.use("/download-file/:id", downloadFile);
app.use("/delete-folder/:id", deleteFolder);
app.use("/view/folder/:id", viewFolderFiles);

app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy(() => {
      res.redirect("/");
    });
  });
});

app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy(() => {
      res.redirect("/home");
    });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`FILE UPLOADER - listening on port ${PORT}!`)
);
