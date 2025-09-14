import { Router, Request, Response } from 'express';
import clientRouter from './clientRoutes';
import documentRouter from './documentRoutes';
import healthRouter from './healthRoutes';

const router = Router();

router.use('/health', healthRouter);
router.use('/clients', clientRouter);
router.use('/documents', documentRouter);

export default router;
