import "dotenv/config";
import knex from "knex";

const dbConfig = {
  client: process.env.DB_CLIENT || "pg",
  connection: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432", 10),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
    ssl: { rejectUnauthorized: false }, // Important for Render!
  },
  debug: true,
};

const db = knex(dbConfig);

export default db;
