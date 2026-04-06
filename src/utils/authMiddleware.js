import { verifyToken } from "./token.js";
import sql from "../database/connection.js";

export async function authMiddleware(req, res) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.writeHead(401);
      res.end("Unauthorized");
      return false;
    }

    const token = authHeader.split(" ")[1];
    const payload = verifyToken(token);

    const result = await sql`
      SELECT * FROM users WHERE id = ${payload.sub}
    `;

    const user = result[0];

    if (!user || user.token_version !== payload.tokenVersion) {
      res.writeHead(401);
      res.end("Invalid token");
      return false;
    }

    req.user = user;
    return true;

  } catch {
    res.writeHead(401);
    res.end("Unauthorized");
    return false;
  }
}