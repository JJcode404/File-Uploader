import { pool } from "../db/pool.js";

const passcodePage = (req, res) => {
  res.render("passcode", { errorMessage: null });
};
const verifyPasscode = async (req, res) => {
  try {
    const { passcode } = req.body;
    const correctPasscode = process.env.ADMINCODE;

    if (passcode === correctPasscode) {
      await pool.query(
        "UPDATE users SET membership_status = 'admin' WHERE user_id = $1",
        [req.user.user_id]
      );

      req.user.membership_status = "admin";

      return res.redirect("/");
    }
    res.render("passcode", {
      errorMessage: "Incorrect passcode. Try again.",
    });
  } catch (error) {
    console.error("Error updating membership status:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export { passcodePage, verifyPasscode };
