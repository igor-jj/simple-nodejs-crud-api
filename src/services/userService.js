import sql from "../database/connection.js";

export async function getAllUsers() {
    return await sql`SELECT * FROM students`;
};

export async function createUser(data) {
    const result = await sql`
        INSERT INTO students (ra, name, email)
        VALUES(${data.ra}, ${data.name}, ${data.email})
        RETURNING *
    `;

    return result[0];
};

export async function updateUser(ra, data) {
    const result = await sql`
        UPDATE students
        SET name = ${data.name}, email = ${data.email}
        WHERE ra = ${ra}
        RETURNING *
    `;

    return result[0];
};

export async function deleteUser(ra) {
    const result = await sql`
        DELETE FROM students
        WHERE ra = ${ra}
        RETURNING *
    `;

    return result[0];
};