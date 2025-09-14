import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';

export function generateToken(clientId: string) {
  const payload = {
    clientId: clientId,
    createdAt: new Date().toISOString(),
  };

  return jwt.sign(payload, JWT_SECRET);
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}
