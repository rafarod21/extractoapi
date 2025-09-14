import axios from 'axios';
import * as cheerio from 'cheerio';

const MAX_CONTENT_LENGTH = 200_000;

export async function extractWebData(url: string) {
  const response = await axios.get(url, {
    timeout: 10000,
    headers: {
      'User-Agent':
        'DocumentProcessorBot/1.0 (+https://github.com/rafarod21/extractoapi)',
    },
    responseType: 'text',
    validateStatus: (status) => status >= 200 && status < 400,
  });

  const html = response.data as string;
  const $ = cheerio.load(html);

  const title = ($('title').first().text() || url).trim();

  const metaDescription = (
    $('meta[name="description"]').attr('content') || ''
  ).trim();

  const bodyText = $('body').text().replace(/\s+/g, ' ').trim();

  const combinedContent =
    (metaDescription ? metaDescription + '\n\n' : '') + bodyText;

  const content = combinedContent.slice(0, MAX_CONTENT_LENGTH);

  return {
    title,
    content,
    processedAt: new Date(),
    type: 'WEB',
  };
}
