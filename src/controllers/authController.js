import * as authService from "../services/authService.js";
import parseBody from "../utils/parseBody.js";

export async function register(req, res) {
  try {
    const data = await parseBody(req);

    const user = await authService.register(data);

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        id: user.id,
        email: user.email,
      }),
    );
  } catch (err) {
    res.writeHead(400);
    res.end(err.message);
  }
}

export async function login(req, res) {
  try {
    const data = await parseBody(req);

    const token = await authService.login(data);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ token }));
  } catch (err) {
    // console.log("ERRO NO LOGIN:", err);
    res.writeHead(401);
    res.end("Invalid credentials");
  }
}

export async function logout(req, res) {
  try {
    await authService.logout(req.user.id);

    res.writeHead(204);
    res.end();
  } catch {
    res.writeHead(500);
    res.end();
  }
}
