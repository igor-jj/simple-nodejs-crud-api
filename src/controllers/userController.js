import * as userService from "../services/userService.js";

export async function getAllUsers(req, res) {
  try {
    const users = await userService.getAllUsers();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  } catch (err) {
    res.statusCode = 500;
    return res.end("Internal Server Error");
  }
}

export async function createUser(req, res, data) {
  if (!data.ra || !data.name || !data.email) {
    res.statusCode = 400;
    return res.end("Bad request");
  }

  try {
    const user = await userService.createUser(data);
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(user));
  } catch (err) {
    res.statusCode = 500;
    return res.end("Internal Server Error");
  }
}

export async function updateUser(req, res, ra, data) {
  try {
    const user = await userService.updateUser(ra, data);
    if (!user) {
      res.statusCode = 404;
      return res.end("User not found");
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(user));
  } catch (err) {
    res.statusCode = 500;
    return res.end("Internal Server Error");
  }
}

export async function deleteUser(req, res, ra) {
  try {
    const user = await userService.deleteUser(ra);
    if (!user) {
      res.statusCode = 404;
      return res.end("User not found");
    }

    res.statusCode = 204;
    res.end();
  } catch (err) {
    res.statusCode = 500;
    return res.end("Internal Server Error");
  }
}
