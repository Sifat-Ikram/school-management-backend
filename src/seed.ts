import { db, users, classes } from "./config/db";
import bcrypt from "bcrypt";

async function main() {
  const hash = await bcrypt.hash("password", 10);
  await db.insert(users).values([
    {
      name: "Admin",
      email: "admin@school.com",
      password_hash: hash,
      role: "admin",
    },
    {
      name: "Teacher",
      email: "teacher@school.com",
      password_hash: hash,
      role: "teacher",
    },
  ]);
  await db.insert(classes).values([
    { name: "Math", section: "A" },
    { name: "Science", section: "B" },
  ]);
  console.log("Seeded successfully");
}

main();
