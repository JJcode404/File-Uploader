import passport from "passport";
const loginPage = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  res.render("login");
};

const authenticateUser = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error("Authentication error:", err);
      return next(err);
    }
    if (!user) {
      return res.render("login", {
        username: info.username,
        error: `${info.message}`,
      });
    }
    req.logIn(user, (loginErr) => {
      if (loginErr) {
        console.error("Login error:", loginErr);
        return next(loginErr);
      }
      return res.redirect("/");
    });
  })(req, res, next);
};

export { loginPage, authenticateUser };
