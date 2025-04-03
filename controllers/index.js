const homePage = async (req, res) => {
  try {
    res.render("index");
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving analytics data",
      error: error.message,
    });
  }
};

export { homePage };
