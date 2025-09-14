import pdfParse from 'pdf-parse';

export async function extractPdfData(buffer: Buffer) {
  try {
    const pdfData = await pdfParse(buffer);

    return {
      title: pdfData.info.Title || 'Untitled PDF',
      content: pdfData.text,
      processedAt: new Date(),
      type: 'PDF',
    };
  } catch (error) {
    throw new Error('Erro ao processar PDF');
    // throw new AppError(404, `Client ID not found.`);
  }
}
