// src/routes/documentRoutes.ts
import { Router } from 'express';
import multer from 'multer';
import {
  handleFetchUrlForClient,
  handleListDocumentsClient,
  handleUploadClientPdf,
} from '../controllers/documentController';

const router = Router();
const upload = multer();

router.post('/pdf/:clientId', upload.single('file'), handleUploadClientPdf);
router.post('/url/:clientId', handleFetchUrlForClient);
router.get('/:clientId', handleListDocumentsClient);

export default router;
