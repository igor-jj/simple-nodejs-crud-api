import {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController.js";

import { authMiddleware } from "../utils/authMiddleware.js";
import parseBody from "../utils/parseBody.js";

export default async function studentRoutes(req, res) {

  // 🔒 GET /students
  if (req.url === "/students" && req.method === "GET") {
    if (!(await authMiddleware(req, res))) return true;

    await getAllStudents(req, res);
    return true;
  }

  // 🔒 POST /students
  if (req.url === "/students" && req.method === "POST") {
    if (!(await authMiddleware(req, res))) return true;

    try {
      const data = await parseBody(req);
      await createStudent(req, res, data);
    } catch {
      res.writeHead(400);
      res.end("Invalid JSON");
    }

    return true;
  }

  // 🔒 PUT /students/:ra
  if (req.url.startsWith("/students/") && req.method === "PUT") {
    if (!(await authMiddleware(req, res))) return true;

    const ra = req.url.split("/")[2];

    try {
      const data = await parseBody(req);
      await updateStudent(req, res, ra, data);
    } catch {
      res.writeHead(400);
      res.end("Invalid JSON");
    }

    return true;
  }

  // 🔒 DELETE /students/:ra
  if (req.url.startsWith("/students/") && req.method === "DELETE") {
    if (!(await authMiddleware(req, res))) return true;

    const ra = req.url.split("/")[2];

    await deleteStudent(req, res, ra);
    return true;
  }

  // ❗ não tratou a rota
  return false;
}