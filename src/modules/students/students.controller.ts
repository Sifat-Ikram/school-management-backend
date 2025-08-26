import { Router } from "express";
import { db, students } from "../../config/db";
import { CreateStudentDto } from "./dto/create-student.dto";
import { jwtMiddleware, roleGuard } from "../auth/auth.middleware";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";

const router = Router();

router.post("/", jwtMiddleware, roleGuard(["admin"]), async (req, res) => {
  const dto = plainToInstance(CreateStudentDto, req.body);
  const errors = await validate(dto);
  if (errors.length) return res.status(400).json(errors);
  const student = await db.insert(students).values(dto).returning();
  res.json(student);
});

router.get(
  "/",
  jwtMiddleware,
  roleGuard(["admin", "teacher"]),
  async (req, res) => {
    const all = await db.select().from(students);
    res.json(all);
  }
);

router.get(
  "/:id",
  jwtMiddleware,
  roleGuard(["admin", "teacher"]),
  async (req, res) => {
    const student = await db
      .select()
      .from(students)
      .where(students.id.eq(Number(req.params.id)))
      .get();
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  }
);

export default router;
