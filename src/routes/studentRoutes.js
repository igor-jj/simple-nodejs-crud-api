import {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController.js";

import parseBody from "../utils/parseBody.js";

// export é usado para que outros arquivos possam importar
export default async function studentRoutes(req, res) {
  if (req.url === "/students" && req.method === "GET") {
    return getAllStudents(req, res);
  }
  if (req.url === "/students" && req.method === "POST") {
    try {
      const data = await parseBody(req);
      return createStudent(req, res, data);
    } catch {
      res.statusCode = 400;
      return res.end("Invalid JSON");
    }
  }
  if (req.url.startsWith("/students/") && req.method === "PUT") {
    const ra = req.url.split("/")[2];
    try {
      const data = await parseBody(req);
      return updateStudent(req, res, ra, data);
    } catch {
      res.statusCode = 400;
      return res.end("Invalid JSON");
    }
  }
  if (req.url.startsWith("/students/") && req.method === "DELETE") {
    const ra = req.url.split("/")[2];
    return deleteStudent(req, res, ra);
  }

  res.statusCode = 404;
  res.end("Route not found");
}
