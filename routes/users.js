const sql = require("../db");

async function getUsers(req, res) {
    const users = await sql`SELECT * FROM students`;

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
}

async function createUser(req, res, body) {
    const result = await sql`
        INSERT INTO students (ra, name, email)
        VALUES (${body.ra}, ${body.name}, ${body.email})
        RETURNING *
    `;

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result[0]));
}

async function updateUser(req, res, ra, body) {
    const result = await sql`
        UPDATE students
        SET name = ${body.name}, email = ${body.email}
        WHERE ra = ${ra}
        RETURNING *
    `;

    if (!result.length) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "User not found" }));
        return;
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result[0]));
}

async function deleteUser(req, res, ra) {
    const result = await sql`
        DELETE FROM students
        WHERE ra = ${ra}
        RETURNING *
    `;

    if (!result.length) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "User not found" }));
        return;
    }

    res.statusCode = 204;
    res.end();
}

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser
};