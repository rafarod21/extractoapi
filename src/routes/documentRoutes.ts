// src/routes/documentRoutes.ts
import { Router } from 'express';
import multer from 'multer';
import {
  handleFetchUrlClient,
  handleListDocumentsClient,
  handleUploadPdfClient,
} from '../controllers/documentController';

const router = Router();
const upload = multer();

router.post('/pdf/:clientId', upload.single('file'), handleUploadPdfClient);
router.post('/url/:clientId', handleFetchUrlClient);
router.get('/:clientId', handleListDocumentsClient);

export default router;
