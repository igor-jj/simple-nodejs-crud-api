import http from "http";
import "dotenv/config";

import authRoutes from "./src/routes/authRoutes.js";
import studentRoutes from "./src/routes/studentRoutes.js";

const PORT = 3000;

const server = http.createServer(async (req, res) => {

  const allowedOrigins = [
    "http://127.0.0.1:5500",
    "http://localhost:5500"
  ];

  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  // 🔐 1. auth
  const authHandled = await authRoutes(req, res);
  if (authHandled) return;

  // 🔒 2. students
  const studentHandled = await studentRoutes(req, res);
  if (studentHandled) return;

  // ❌ 3. fallback
  res.writeHead(404);
  res.end("Route not found");
});

server.listen(PORT, () => {
  console.log(`Server running on: ${PORT}`);
});