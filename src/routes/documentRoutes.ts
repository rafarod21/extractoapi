// src/routes/documentRoutes.ts
import { Router } from 'express';
import multer from 'multer';
import {
  handleListDocumentsClient,
  handleUploadClientPdf,
} from '../controllers/documentController';

const router = Router();
const upload = multer();

router.post(
  '/uploadpdf/:clientId',
  upload.single('file'),
  handleUploadClientPdf
);

router.get('/:clientId', handleListDocumentsClient);

export default router;
