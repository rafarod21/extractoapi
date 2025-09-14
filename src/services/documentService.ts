import prisma from '../libs/prismaClient';
import { extractPdfData } from './pdfProcessor';
import { AppError } from '../utils/AppError';
import { extractWebData } from './webScraper';

export async function processClientPdf(fileBuffer: Buffer, clientId: string) {
  const existingClient = await prisma.client.findUnique({
    where: { id: clientId },
  });

  if (!existingClient) {
    throw new AppError(404, 'Client ID not found.');
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

export async function processClientWeb(url: string, clientId: string) {
  const existingClient = await prisma.client.findUnique({
    where: { id: clientId },
  });

  if (!existingClient) {
    throw new AppError(404, 'Client ID not found.');
  }

  let extracted;

  try {
    extracted = await extractWebData(url);
  } catch (error) {
    throw new AppError(
      422,
      'Failed to fetch or process the URL. Please ensure it is valid and accessible.'
    );
  }

  const createdDocument = await prisma.document.create({
    data: {
      title: extracted.title,
      content: extracted.content,
      processedAt: extracted.processedAt,
      type: extracted.type,
      client: { connect: { id: clientId } },
    },
  });

  return createdDocument;
}

export async function listDocumentsClient(clientId: string) {
  const existingClient = await prisma.client.findUnique({
    where: { id: clientId },
  });

  if (!existingClient) {
    throw new AppError(404, 'Client ID not found.');
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
