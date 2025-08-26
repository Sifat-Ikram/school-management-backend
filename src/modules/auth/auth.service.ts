import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db, users } from "../../config/db";

export class AuthService {
  async signup(data: any) {
    const hash = await bcrypt.hash(data.password, 10);
    return db
      .insert(users)
      .values({
        ...data,
        password_hash: hash,
      })
      .returning();
  }

  async login(email: string, password: string) {
    const user = await db
      .select()
      .from(users)
      .where(users.email.eq(email))
      .get();
    if (!user) throw new Error("Invalid credentials");
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) throw new Error("Invalid credentials");
    const token = jwt.sign(
      { sub: user.id, role: user.role },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    );
    return { access_token: token };
  }
}
