import { Router } from 'express';
import clientRouter from './clientRoutes';
import documentRouter from './documentRoutes';
import healthRouter from './healthRoutes';
import { authenticateToken } from '../middlewares/auth';

const router = Router();

router.use('/health', healthRouter);
router.use('/clients', clientRouter);
router.use('/documents', authenticateToken, documentRouter);

export default router;
