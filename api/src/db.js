import "dotenv/config";
import knex from "knex";

// First create the configuration object
const dbConfig = {
  client: process.env.DB_CLIENT || "mysql2",
  connection: {
    host: process.env.DB_HOST || "127.0.0.1",
    port: parseInt(process.env.DB_PORT || "3306", 10),
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE_NAME || "meal_sharing",
  },
  debug: true,
};

// Then initialize the db connection
const db = knex(dbConfig);

export default db;
