import { pool } from "../db/pool.js";
const createMessagePage = (req, res) => {
  res.render("createMessage");
};

const postUserMessage = async (req, res) => {
  try {
    await pool.query(
      "INSERT INTO messages (message_title, message, user_id, created_at) VALUES ($1, $2, $3, NOW())",
      [req.body.title, req.body.message, req.user.user_id]
    );

    res.redirect("/");
  } catch (error) {
    console.error("Error inserting message:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const deleteMessage = async (req, res) => {
  const messageId = req.params.id;
  console.log(messageId);
  await pool.query("DELETE FROM messages WHERE message_id = $1", [messageId]);

  res.redirect("/");
};

export { createMessagePage, postUserMessage, deleteMessage };
