import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { AppError } from '../utils/AppError';
import {
  listDocumentsClient,
  processClientPdf,
} from '../services/documentService';

export async function handleUploadClientPdf(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { clientId } = z
      .object({ clientId: z.string() })
      .parse(request.params);

    if (!request.file) {
      return next(new AppError(400, 'No files sent.'));
    }

    const createdDocument = await processClientPdf(
      request.file.buffer,
      clientId
    );

    return response.status(201).json(createdDocument);
  } catch (error) {
    return next(error);
  }
}

export async function handleListDocumentsClient(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { clientId } = z
      .object({ clientId: z.string() })
      .parse(request.params);

    const documents = await listDocumentsClient(clientId);

    return response.json(documents);
  } catch (error) {
    return next(error);
  }
}
