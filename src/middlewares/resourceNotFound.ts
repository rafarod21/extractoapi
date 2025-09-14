import { Request, Response } from 'express';

export function resourceNotFoundHandler(request: Request, response: Response) {
  response.status(404).json({
    message: `Resource ${request.method} ${request.originalUrl} not found.`,
  });
}
