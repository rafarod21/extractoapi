import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../utils/AppError';
import { MulterError } from 'multer';

export function errorHandler(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  console.error(error);

  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      message: error.message,
    });
  }

  if (error instanceof ZodError) {
    return response.status(400).json({ errors: error.issues });
  }

  if (error instanceof MulterError) {
    return response.status(400).json({
      message: error.message,
      code: error.code,
    });
  }

  return response.status(500).json({
    message: 'Internal Server Error',
    error: error.message,
  });
}
