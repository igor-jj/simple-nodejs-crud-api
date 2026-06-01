import authRoutes from "../modules/auth/auth.routes.js";
import studentRoutes from "../modules/student/student.routes.js";

export default async function routes(req, res) {
  // 🔐 1. auth
  if (await authRoutes(req, res)) return;

  // 🔒 2. students
  if (await studentRoutes(req, res)) return;

  // ❌ 3. fallback
  res.statusCode = 404;
  res.end("Route not found");
}