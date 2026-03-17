const { getUsers, createUser, updateUser, deleteUser } = require("./routes/users");
const http = require("http");
const PORT = 3000;

const server = http.createServer(async (req, res) => {
  // Permite requisições de qualquer origem
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Métodos permitidos
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

  // Headers permitidos
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.url === "/users" && req.method === "GET") {
    await getUsers(req, res);
  } else if (req.url === "/users" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", async () => {
      let data;
      try {
        data = JSON.parse(body);
      } catch {
        res.statusCode = 400;
        res.end("Invalid JSON");
        return
      }

      if (!data.name || !data.email || !data.ra) {
        res.statusCode = 400;
        res.end("Bad Request");
        return;
      }
      await createUser(req, res, data);
    });
  } else if (req.url.startsWith("/users/") && req.method === "PUT") {
    let body = "";
    const ra = req.url.split("/")[2];
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", async () => {
      let data;
      try {
        data = JSON.parse(body);
      } catch {
        res.statusCode = 400;
        res.end("Invalid JSON");
        return
      }

      if (!data.name || !data.email) {
        res.statusCode = 400;
        res.end("Bad Request");
        return;
      }

      await updateUser(req, res, ra, data);
    });
  } else if (req.url.startsWith("/users/") && req.method === "DELETE") {
    const ra = req.url.split("/")[2];
    await deleteUser(req, res, ra);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Route not found" }));
  }
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhosts:${PORT}`);
});