import express from "express";
import cors from "cors";
import studentsRouter from "./modules/students/students.controller";
import "reflect-metadata";
import { errorHandler } from "./middleware/error.middleware";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/students", studentsRouter);

// Swagger setup
const swaggerSpec = swaggerJsdoc({
  swaggerDefinition: {
    openapi: "3.0.0",
    info: { title: "School API", version: "1.0.0" },
  },
  apis: ["./src/modules/**/*.ts"],
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler);

export default app;
