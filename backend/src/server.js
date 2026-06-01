import http from "http";
import "dotenv/config";

import routes from "./routes/routes.js";

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

  // handle routes
  await routes(req, res);
});

server.listen(PORT, () => {
  console.log(`Server running on: ${PORT}`);
});