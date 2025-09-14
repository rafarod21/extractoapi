// src/routes/documentRoutes.ts
import { Router } from 'express';
import multer from 'multer';
import {
  handleFetchUrlClient,
  handleListDocumentsClient,
  handleUploadPdfClient,
} from '../controllers/documentController';

const documentRouter = Router();
const upload = multer();

documentRouter.post(
  '/pdf/:clientId',
  upload.single('file'),
  handleUploadPdfClient
);
documentRouter.post('/url/:clientId', handleFetchUrlClient);
documentRouter.get('/:clientId', handleListDocumentsClient);

export default documentRouter;
