import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import bcrypt from "bcryptjs";
import { pool } from "./db/pool.js";
import session from "express-session";
import passport from "passport";
const PgSession = (await import("connect-pg-simple")).default(session);
import { Strategy as LocalStrategy } from "passport-local";
import { signRouter } from "./routers/signUpRouter.js";
import { loginRouter } from "./routers/loginRouter.js";
import { homeRouter } from "./routers/indexRouter.js";
import { messageRouter } from "./routers/createMessageRouter.js";
import { passcodeRouter } from "./routers/passcodeRouter.js";
import { deleteMessage } from "./controllers/createMessage.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assetsPath = path.join(__dirname, "public");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(assetsPath));

app.use(
  session({
    store: new PgSession({
      pool: pool,
      tableName: "session",
      createTableIfMissing: true,
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
  })
);
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
      );
      const user = rows[0];

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
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
  done(null, user.user_id);
});

passport.deserializeUser(async (user_id, done) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM users WHERE user_id = $1",
      [user_id]
    );
    const user = rows[0];

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
app.use("/create-message", messageRouter);
app.use("/delete-message/:id", deleteMessage);
app.use("/passcode", passcodeRouter);

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Members Only app - listening on port ${PORT}!`)
);
