import {
  register,
  login,
  logout
} from "../controllers/authController.js";

import { authMiddleware } from "../utils/authMiddleware.js";

export default async function authRoutes(req, res) {
  if (req.url === "/auth/register" && req.method === "POST") {
    await register(req, res);
    return true;
  }

  if (req.url === "/auth/login" && req.method === "POST") {
    await login(req, res);
    return true;
  }

  if (req.url === "/auth/logout" && req.method === "POST") {
    if (!(await authMiddleware(req, res))) return true;

    await logout(req, res);
    return true;
  }

  return false;
}