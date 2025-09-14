import prisma from '../libs/prismaClient';
import { extractPdfData } from './pdfProcessor';
import { AppError } from '../utils/AppError';

export async function processClientPdf(fileBuffer: Buffer, clientId: string) {
  const existingClient = await prisma.client.findUnique({
    where: { id: clientId },
  });

  if (!existingClient) {
    throw new AppError(404, `Client ID not found.`);
  }

  const extracted = await extractPdfData(fileBuffer);
  const title = extracted.title ?? 'Untitled PDF';
  const content = extracted.content ?? '';
  const processedAt = extracted.processedAt ?? new Date();
  const type = extracted.type ?? 'PDF';

  const createdDocument = await prisma.document.create({
    data: {
      title,
      content,
      processedAt,
      type,
      client: {
        connect: { id: clientId },
      },
    },
  });

  return createdDocument;
}

export async function listDocumentsClient(clientId: string) {
  const existingClient = await prisma.client.findUnique({
    where: { id: clientId },
  });

  if (!existingClient) {
    throw new AppError(404, `Client ID not found.`);
  }

  const documents = await prisma.document.findMany({
    where: { clientId },
    orderBy: { processedAt: 'desc' },
    select: {
      id: true,
      title: true,
      content: true,
      processedAt: true,
      type: true,
    },
  });

  return documents;
}
