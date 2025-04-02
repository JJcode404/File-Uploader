import { pool } from "./pool.js";

const getUserMessages = async () => {
  try {
    const result = await pool.query(`
      SELECT 
        users.full_name, 
        users.username, 
        users.membership_status,
        messages.message_id,
        messages.message_title, 
        messages.message,
        messages.created_at
      FROM users
      INNER JOIN messages ON users.user_id = messages.user_id
      ORDER BY messages.created_at DESC;
    `);

    return result.rows;
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw new Error("Failed to retrieve messages");
  }
};

export { getUserMessages };
