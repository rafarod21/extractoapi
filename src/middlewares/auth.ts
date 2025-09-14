import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import { verifyToken } from '../utils/jwt';
import z from 'zod';

interface JwtPayload {
  clientId: string;
  createdAt: string;
}

export function authenticateToken(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError(401, 'Token missing');
  }

  const [, token] = authHeader.split(' ');

  if (!token) {
    throw new AppError(401, 'Token missing');
  }

  try {
    const { clientId } = z
      .object({ clientId: z.string() })
      .parse(request.params);

    const decoded = verifyToken(token) as JwtPayload;

    if (decoded.clientId !== clientId) {
      throw new AppError(403, 'Invalid token for this client');
    }

    return next();
  } catch (error) {
    return next(error);
  }
}
