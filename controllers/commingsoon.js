const comingsoonPage = async (req, res) => {
  try {
    res.render("commingSoon");
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving analytics data",
      error: error.message,
    });
  }
};

export { comingsoonPage };
