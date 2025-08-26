import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { users, students, classes } from "./schema";

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "admin",
  password: process.env.DB_PASS || "admin",
  database: process.env.DB_NAME || "school",
  port: 5432,
});

export const db = drizzle(pool);

export { users, students, classes };
