const homePage = async (req, res) => {
  try {
    if (req.user) {
      // User is logged in, render the index page
      res.render("index");
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

export { homePage };
