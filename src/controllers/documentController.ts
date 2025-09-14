import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { AppError } from '../utils/AppError';
import {
  listDocumentsClient,
  processClientPdf,
  processClientWeb,
} from '../services/documentService';

export async function handleUploadPdfClient(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { clientId } = z
      .object({ clientId: z.string() })
      .parse(request.params);

    if (!request.file) {
      throw new AppError(400, 'No files sent.');
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

export async function handleFetchUrlClient(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { clientId } = z
      .object({ clientId: z.string() })
      .parse(request.params);

    const bodySchema = z.object({ url: z.url() });
    const { url } = bodySchema.parse(request.body);

    const createdDocument = await processClientWeb(url, clientId);
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
