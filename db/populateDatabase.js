import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Client } = pkg;

const SQL = `
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE users (
    user_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    membership_status VARCHAR(50) NOT NULL
);

CREATE TABLE messages (
    message_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    message_title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    user_id UUID NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

`;

async function main() {
  console.log("Connecting to database:", process.env.DATABASE_NAME);
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
