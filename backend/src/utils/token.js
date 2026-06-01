import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET;

export function generateToken(student) {
  return jwt.sign(
    {
      sub: student.id,
      tokenVersion: student.token_version
    },
    JWT_SECRET,
    {
      expiresIn: '30d'
    }
  );
}

export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}