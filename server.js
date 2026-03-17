import http from "http";
import "dotenv/config"

import userRoutes from "./src/routes/userRoutes.js";

const PORT = 3000;

const server = http.createServer(async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        res.writeHead(204);
        return res.end();
    }
    
    await userRoutes(req, res);
});

server.listen(PORT, () => {
    console.log(`Server running on: ${PORT}`);
});