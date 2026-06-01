import sql from "../../database/connection.js";
import { hashPassword, comparePassword } from "../../utils/hash.js";
import { generateToken } from "../../utils/token.js";

export async function register({ email, password }) {
  const existing = await sql`
    SELECT * FROM users WHERE email = ${email}
  `;

  if (existing.length > 0) {
    throw new Error("User already exists");
  }

  const passwordHash = await hashPassword(password);

  const result = await sql`
    INSERT INTO users (email, password_hash)
    VALUES (${email}, ${passwordHash})
    RETURNING *
  `;

  return result[0];
}

export async function login({ email, password }) {
  const result = await sql`
    SELECT * FROM users WHERE email = ${email}
  `;

  const user = result[0];

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const valid = await comparePassword(password, user.password_hash);

  if (!valid) {
    throw new Error("Invalid credentials");
  }

  return generateToken(user);
}

export async function logout(userId) {
  await sql`
    UPDATE users
    SET token_version = token_version + 1
    WHERE id = ${userId}
  `;
}