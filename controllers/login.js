import passport from "passport";
const loginPage = (req, res) => {
  res.render("login");
};

const authenticateUser = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
});

export { loginPage, authenticateUser };
