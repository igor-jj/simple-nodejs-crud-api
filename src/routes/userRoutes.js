import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

import parseBody from "../utils/parseBody.js";

// export é usado para que outros arquivos possam importar
export default async function userRoutes(req, res) {
  if (req.url === "/users" && req.method === "GET") {
    return getAllUsers(req, res);
  }
  if (req.url === "/users" && req.method === "POST") {
    try {
      const data = await parseBody(req);
      return createUser(req, res, data);
    } catch {
      res.statusCode = 400;
      return res.end("Invalid JSON");
    }
  }
  if (req.url.startsWith("/users/") && req.method === "PUT") {
    const ra = req.url.split("/")[2];
    try {
      const data = await parseBody(req);
      return updateUser(req, res, ra, data);
    } catch {
      res.statusCode = 400;
      return res.end("Invalid JSON");
    }
  }
  if (req.url.startsWith("/users/") && req.method === "DELETE") {
    const ra = req.url.split("/")[2];
    return deleteUser(req, res, ra);
  }

  res.statusCode = 404;
  res.end("Route not found");
}
